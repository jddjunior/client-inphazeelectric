/* In Phaze Electric — lead + media store and webhook transport.
   Prototype backend: persists to the browser so the forms and the CRM are genuinely wired
   together. Every record carries the same shape the real backend will receive, so swapping
   this for a live endpoint is a config change (set the webhook URL), not a rewrite.

   Storage keys owned by this file:
     inphaze.leads.v1    — lead records incl. embedded media
     inphaze.webhook.v1  — webhook configuration + delivery log
*/
(function () {
  var LK = 'inphaze.leads.v1';
  var WK = 'inphaze.webhook.v1';
  var MEDIA_ROOT = 'media/leads';

  function read(k, fallback) {
    try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? fallback : v; }
    catch (e) { return fallback; }
  }
  function write(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; }
    catch (e) { console.warn('[InPhazeLeads] storage full or blocked', e); return false; }
  }
  function uid(p) {
    return (p || 'ld') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }
  function slug(s) {
    return String(s || 'file').toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48);
  }

  /* Downscale + re-encode so a phone photo doesn't blow the storage budget.
     The real backend keeps originals; this mirrors the derivative it would generate. */
  function processImage(file, maxEdge, quality) {
    maxEdge = maxEdge || 1400;
    quality = quality || 0.72;
    return new Promise(function (resolve, reject) {
      if (!file || !/^image\//.test(file.type)) { reject(new Error('Not an image: ' + (file && file.name))); return; }
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        var w = img.naturalWidth, h = img.naturalHeight;
        var scale = Math.min(1, maxEdge / Math.max(w, h));
        var cw = Math.max(1, Math.round(w * scale)), ch = Math.max(1, Math.round(h * scale));
        var c = document.createElement('canvas');
        c.width = cw; c.height = ch;
        c.getContext('2d').drawImage(img, 0, 0, cw, ch);
        var dataUrl = c.toDataURL('image/jpeg', quality);
        URL.revokeObjectURL(url);
        resolve({
          id: uid('ph'),
          filename: slug(file.name.replace(/\.[^.]+$/, '')) + '.jpg',
          originalName: file.name,
          mimeType: 'image/jpeg',
          width: cw,
          height: ch,
          bytes: Math.round((dataUrl.length - 'data:image/jpeg;base64,'.length) * 0.75),
          capturedAt: new Date().toISOString(),
          dataUrl: dataUrl
        });
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('Could not decode ' + file.name)); };
      img.src = url;
    });
  }

  function processFiles(fileList, max) {
    var files = Array.prototype.slice.call(fileList || []).filter(function (f) { return /^image\//.test(f.type); });
    if (max) files = files.slice(0, max);
    return Promise.all(files.map(function (f) { return processImage(f).catch(function (e) { console.warn(e); return null; }); }))
      .then(function (r) { return r.filter(Boolean); });
  }

  var STATUSES = ['new', 'contacted', 'quoted', 'scheduled', 'won', 'lost'];

  function defaultWebhook() {
    return {
      url: '',
      secret: '',
      autoSend: true,
      includePhotos: true,
      provider: 'housecall-pro',
      log: []
    };
  }

  /* Payload contract — this is what hits your endpoint / Housecall Pro bridge. */
  function buildPayload(lead, cfg) {
    cfg = cfg || getWebhook();
    return {
      event: 'lead.created',
      sentAt: new Date().toISOString(),
      source: {
        brand: 'In Phaze Electric',
        site: 'inphazeelectric.com',
        page: lead.sourcePage || 'contact',
        campaign: lead.campaign || null
      },
      lead: {
        id: lead.id,
        createdAt: lead.createdAt,
        status: lead.status,
        urgency: lead.urgency,
        customer: {
          name: lead.name || null,
          phone: lead.phone || null,
          email: lead.email || null,
          address: lead.address || null,
          city: lead.city || null,
          zip: lead.zip || null
        },
        job: {
          service: lead.service || null,
          description: lead.message || null,
          preferredContact: lead.preferredContact || 'phone'
        },
        media: (lead.photos || []).map(function (p) {
          var m = {
            id: p.id,
            filename: p.filename,
            mimeType: p.mimeType,
            width: p.width,
            height: p.height,
            bytes: p.bytes,
            storagePath: MEDIA_ROOT + '/' + lead.id + '/' + p.filename
          };
          if (cfg.includePhotos) m.dataUrl = p.dataUrl;
          return m;
        })
      },
      housecallPro: {
        customer: {
          first_name: (lead.name || '').split(' ')[0] || null,
          last_name: (lead.name || '').split(' ').slice(1).join(' ') || null,
          mobile_number: lead.phone || null,
          email: lead.email || null,
          addresses: lead.address ? [{ street: lead.address, city: lead.city || 'Orlando', state: 'FL', zip: lead.zip || null }] : []
        },
        job: {
          description: [lead.service, lead.message].filter(Boolean).join(' — ') || null,
          job_fields: { urgency: lead.urgency || null, lead_source: 'Website' },
          attachment_count: (lead.photos || []).length
        }
      }
    };
  }

  function getWebhook() {
    var w = read(WK, null);
    if (!w) { w = defaultWebhook(); write(WK, w); }
    if (!w.log) w.log = [];
    return w;
  }
  function setWebhook(patch) {
    var w = getWebhook();
    for (var k in patch) if (Object.prototype.hasOwnProperty.call(patch, k)) w[k] = patch[k];
    write(WK, w);
    return w;
  }
  function logDelivery(entry) {
    var w = getWebhook();
    w.log.unshift(Object.assign({ at: new Date().toISOString(), id: uid('dl') }, entry));
    w.log = w.log.slice(0, 40);
    write(WK, w);
    return w.log[0];
  }

  function listLeads() { return read(LK, []); }
  function saveLeads(list) { return write(LK, list); }

  function createLead(input) {
    var lead = Object.assign({
      id: uid('ld'),
      createdAt: new Date().toISOString(),
      status: 'new',
      urgency: 'soon',
      sourcePage: 'contact',
      photos: [],
      delivery: { state: 'pending', attempts: 0, lastError: null, lastAt: null }
    }, input || {});
    lead.mediaFolder = MEDIA_ROOT + '/' + lead.id;
    var list = listLeads();
    list.unshift(lead);
    saveLeads(list);
    return lead;
  }

  function updateLead(id, patch) {
    var list = listLeads();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) { list[i] = Object.assign({}, list[i], patch); saveLeads(list); return list[i]; }
    }
    return null;
  }

  function deleteLead(id) {
    saveLeads(listLeads().filter(function (l) { return l.id !== id; }));
  }

  /* Attempt delivery. With no URL configured the lead stays queued — nothing is lost,
     and the CRM shows exactly what would have been sent. */
  function deliver(lead) {
    var cfg = getWebhook();
    var payload = buildPayload(lead, cfg);
    if (!cfg.url) {
      updateLead(lead.id, { delivery: { state: 'queued', attempts: (lead.delivery && lead.delivery.attempts) || 0, lastError: 'No webhook URL configured', lastAt: new Date().toISOString() } });
      logDelivery({ leadId: lead.id, ok: false, status: 0, note: 'Queued — no endpoint configured yet' });
      return Promise.resolve({ ok: false, queued: true });
    }
    var headers = { 'Content-Type': 'application/json' };
    if (cfg.secret) headers['X-InPhaze-Signature'] = cfg.secret;
    var attempts = ((lead.delivery && lead.delivery.attempts) || 0) + 1;
    return fetch(cfg.url, { method: 'POST', headers: headers, body: JSON.stringify(payload) })
      .then(function (res) {
        var ok = res.ok;
        updateLead(lead.id, { delivery: { state: ok ? 'sent' : 'failed', attempts: attempts, lastError: ok ? null : 'HTTP ' + res.status, lastAt: new Date().toISOString() } });
        logDelivery({ leadId: lead.id, ok: ok, status: res.status, note: ok ? 'Delivered' : 'Endpoint returned ' + res.status });
        return { ok: ok, status: res.status };
      })
      .catch(function (err) {
        updateLead(lead.id, { delivery: { state: 'failed', attempts: attempts, lastError: String(err && err.message || err), lastAt: new Date().toISOString() } });
        logDelivery({ leadId: lead.id, ok: false, status: 0, note: String(err && err.message || err) });
        return { ok: false, error: err };
      });
  }

  /* files may be raw File objects OR records already produced by processFiles()
     (the forms process on pick so the user sees thumbnails immediately). */
  function submit(input, files) {
    var arr = Array.prototype.slice.call(files || []);
    var pre = arr.filter(function (f) { return f && f.dataUrl; });
    var raw = arr.filter(function (f) { return f && !f.dataUrl; });
    return processFiles(raw, Math.max(0, 8 - pre.length)).then(function (processed) {
      var photos = pre.concat(processed).slice(0, 8);
      return photos;
    }).then(function (photos) {
      var lead = createLead(Object.assign({}, input, { photos: photos }));
      var cfg = getWebhook();
      var p = cfg.autoSend ? deliver(lead) : Promise.resolve({ ok: false, queued: true });
      return p.then(function (r) { return { lead: lead, delivery: r }; });
    });
  }

  function allMedia() {
    var out = [];
    listLeads().forEach(function (l) {
      (l.photos || []).forEach(function (p) {
        out.push(Object.assign({}, p, { leadId: l.id, leadName: l.name, service: l.service, storagePath: MEDIA_ROOT + '/' + l.id + '/' + p.filename }));
      });
    });
    return out;
  }

  function stats() {
    var list = listLeads();
    var media = allMedia();
    var bytes = 0;
    try { bytes = (localStorage.getItem(LK) || '').length; } catch (e) {}
    var byStatus = {};
    STATUSES.forEach(function (s) { byStatus[s] = 0; });
    list.forEach(function (l) { if (byStatus[l.status] != null) byStatus[l.status]++; });
    return {
      total: list.length,
      byStatus: byStatus,
      photos: media.length,
      undelivered: list.filter(function (l) { return !l.delivery || l.delivery.state !== 'sent'; }).length,
      storageKB: Math.round(bytes / 1024)
    };
  }

  function exportJSON() {
    return JSON.stringify({ exportedAt: new Date().toISOString(), leads: listLeads(), webhook: getWebhook() }, null, 2);
  }

  function seedDemo() {
    if (listLeads().length) return false;
    [
      { name: 'Dana Whitfield', phone: '(407) 555-0142', email: 'dana.w@example.com', address: '1180 Chelton Cir', city: 'Winter Park', zip: '32789', service: 'Panel or service upgrade', urgency: 'soon', message: 'Breakers trip whenever the dryer and AC run together. 1978 panel, want a quote for 200A.', status: 'quoted', sourcePage: 'panel-upgrade' },
      { name: 'Marcus Bell', phone: '(407) 555-0198', email: 'mbell@example.com', address: '4402 Lake Mary Blvd', city: 'Lake Mary', zip: '32746', service: 'EV charger installation', urgency: 'quote', message: 'New Rivian. Garage is on the opposite wall from the panel — need to know if that changes the price.', status: 'new', sourcePage: 'ev-charger' },
      { name: 'Priya Raman', phone: '(321) 555-0170', email: 'praman@example.com', address: '77 Bayberry Ct', city: 'Oviedo', zip: '32765', service: 'Troubleshooting & repair', urgency: 'now', message: 'Warm outlet in the nursery and a faint burning smell. Breaker is off.', status: 'scheduled', sourcePage: 'contact' }
    ].forEach(function (l) { createLead(l); });
    return true;
  }

  window.InPhazeLeads = {
    STATUSES: STATUSES,
    MEDIA_ROOT: MEDIA_ROOT,
    processFiles: processFiles,
    listLeads: listLeads,
    createLead: createLead,
    updateLead: updateLead,
    deleteLead: deleteLead,
    submit: submit,
    deliver: deliver,
    buildPayload: buildPayload,
    getWebhook: getWebhook,
    setWebhook: setWebhook,
    allMedia: allMedia,
    stats: stats,
    exportJSON: exportJSON,
    seedDemo: seedDemo
  };
})();

/* ---------------------------------------------------------------------------
   In Phaze Electric — call tracking, recording references, and sentiment.

   What this file does NOT do: place, route, or record calls. That requires a
   telephony provider (CallRail or Twilio). This is the consumer side — the
   number pool, the attribution model, the call log, and the sentiment pass —
   plus the exact inbound payload it expects, so wiring a provider is config.

   Storage keys owned here:
     inphaze.calls.v1     — call records
     inphaze.numbers.v1   — tracking number pool + attribution
     inphaze.telephony.v1 — provider config
--------------------------------------------------------------------------- */
(function () {
  var CK = 'inphaze.calls.v1';
  var NK = 'inphaze.numbers.v1';
  var TK = 'inphaze.telephony.v1';

  function read(k, fallback) {
    try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? fallback : v; }
    catch (e) { return fallback; }
  }
  function write(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; }
    catch (e) { console.warn('[InPhazeCalls] storage full or blocked', e); return false; }
  }
  function uid(p) { return (p || 'cl') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  var OUTCOMES = ['answered', 'missed', 'voicemail', 'abandoned'];

  /* Attribution model: one tracking number per channel. Swapping the number
     displayed on a page is what makes the channel measurable — the main line
     never changes for existing customers. */
  function defaultNumbers() {
    return [
      { id: 'num_main', number: '(407) 599-7777', label: 'Main line', channel: 'direct', target: 'sitewide / trucks / existing customers', isPrimary: true },
      { id: 'num_gads', number: '(407) 599-7801', label: 'Google Ads', channel: 'paid-search', target: 'paid landing pages', isPrimary: false },
      { id: 'num_gbp', number: '(407) 599-7802', label: 'Google Business Profile', channel: 'gbp', target: 'map pack listing', isPrimary: false },
      { id: 'num_seo', number: '(407) 599-7803', label: 'Organic search', channel: 'organic', target: 'service + city pages', isPrimary: false },
      { id: 'num_lsa', number: '(407) 599-7804', label: 'Local Services Ads', channel: 'lsa', target: 'LSA profile', isPrimary: false }
    ];
  }

  function defaultTelephony() {
    return {
      provider: 'callrail',
      ingestUrl: '',
      apiKeyRef: '',
      recordCalls: true,
      whisperMessage: true,
      autoAnalyze: true,
      log: []
    };
  }

  function listNumbers() {
    var n = read(NK, null);
    if (!n) { n = defaultNumbers(); write(NK, n); }
    return n;
  }
  function setNumbers(list) { write(NK, list); return list; }

  function getTelephony() {
    var t = read(TK, null);
    if (!t) { t = defaultTelephony(); write(TK, t); }
    if (!t.log) t.log = [];
    return t;
  }
  function setTelephony(patch) {
    var t = getTelephony();
    for (var k in patch) if (Object.prototype.hasOwnProperty.call(patch, k)) t[k] = patch[k];
    write(TK, t);
    return t;
  }

  function listCalls() { return read(CK, []); }
  function saveCalls(list) { return write(CK, list); }

  /* Shape a provider webhook body (CallRail / Twilio) into our record. */
  function fromProvider(body, provider) {
    provider = provider || getTelephony().provider;
    if (provider === 'twilio') {
      return {
        providerCallId: body.CallSid,
        fromNumber: body.From,
        trackingNumber: body.To,
        durationSec: parseInt(body.CallDuration || body.DialCallDuration || 0, 10),
        outcome: body.CallStatus === 'completed' ? 'answered' : (body.CallStatus === 'no-answer' ? 'missed' : 'abandoned'),
        recordingUrl: body.RecordingUrl || null,
        startedAt: body.Timestamp || new Date().toISOString(),
        callerCity: body.FromCity || null
      };
    }
    return {
      providerCallId: body.id || body.resource_id,
      fromNumber: body.customer_phone_number,
      trackingNumber: body.tracking_phone_number,
      durationSec: parseInt(body.duration || 0, 10),
      outcome: body.answered === false ? 'missed' : 'answered',
      recordingUrl: body.recording || null,
      transcript: body.transcription || null,
      startedAt: body.start_time || new Date().toISOString(),
      callerCity: body.customer_city || null,
      firstTime: body.first_call === true
    };
  }

  function attribute(trackingNumber) {
    var hit = listNumbers().filter(function (n) { return n.number === trackingNumber; })[0];
    return hit || { id: 'num_unknown', label: 'Unattributed', channel: 'unknown', number: trackingNumber || '—' };
  }

  function createCall(input) {
    var src = attribute(input.trackingNumber);
    var call = Object.assign({
      id: uid('cl'),
      loggedAt: new Date().toISOString(),
      startedAt: new Date().toISOString(),
      durationSec: 0,
      outcome: 'answered',
      recordingUrl: null,
      transcript: null,
      sentiment: null,
      leadId: null,
      answeredBy: null,
      firstTime: true,
      tags: []
    }, input || {});
    call.source = { numberId: src.id, label: src.label, channel: src.channel, number: src.number };
    var list = listCalls();
    list.unshift(call);
    saveCalls(list);
    return call;
  }

  function ingest(body, provider) {
    return createCall(fromProvider(body, provider));
  }

  function updateCall(id, patch) {
    var list = listCalls();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) { list[i] = Object.assign({}, list[i], patch); saveCalls(list); return list[i]; }
    }
    return null;
  }
  function deleteCall(id) { saveCalls(listCalls().filter(function (c) { return c.id !== id; })); }

  /* --- Sentiment ---------------------------------------------------------
     Prefers the built-in Claude API (no key needed). Falls back to a keyword
     heuristic so the UI is never dead when the model is unavailable. */
  var POS = ['thank', 'thanks', 'great', 'perfect', 'appreciate', 'awesome', 'helpful', 'happy', 'excellent', 'fair', 'honest', 'quick', 'recommend', 'wonderful', 'love'];
  var NEG = ['angry', 'upset', 'frustrated', 'ridiculous', 'terrible', 'never', 'refund', 'complaint', 'unacceptable', 'waited', 'still not', 'nobody', 'rude', 'expensive', 'rip off', 'cancel', 'disappointed'];
  var RISK = ['lawyer', 'attorney', 'bbb', 'review', 'refund', 'cancel', 'report', 'unlicensed', 'fire', 'smoke', 'shock'];

  function heuristic(text) {
    var t = String(text || '').toLowerCase();
    var pos = 0, neg = 0, risk = [];
    POS.forEach(function (w) { if (t.indexOf(w) > -1) pos++; });
    NEG.forEach(function (w) { if (t.indexOf(w) > -1) neg++; });
    RISK.forEach(function (w) { if (t.indexOf(w) > -1) risk.push(w); });
    var score = (pos - neg) / Math.max(3, pos + neg);
    score = Math.max(-1, Math.min(1, score));
    return {
      score: Number(score.toFixed(2)),
      label: score > 0.25 ? 'positive' : (score < -0.2 ? 'negative' : 'neutral'),
      intent: /quote|estimate|price|cost|how much/.test(t) ? 'price shopping'
            : /schedule|appointment|come out|available/.test(t) ? 'ready to book'
            : /not working|broken|tripping|smell|spark|out/.test(t) ? 'urgent repair'
            : 'general inquiry',
      summary: 'Heuristic read — model unavailable, so this is keyword-based only.',
      coaching: neg > pos ? 'Caller expressed friction. Worth an owner callback.' : 'No friction signals detected.',
      riskFlags: risk,
      engine: 'heuristic'
    };
  }

  function analyze(call) {
    var text = call && call.transcript;
    if (!text) return Promise.resolve(null);
    var canModel = typeof window !== 'undefined' && window.claude && typeof window.claude.complete === 'function';
    if (!canModel) {
      var h = heuristic(text);
      updateCall(call.id, { sentiment: h });
      return Promise.resolve(h);
    }
    var prompt =
      'You analyze inbound phone calls for an electrical contractor in Orlando, FL. ' +
      'Read the transcript and reply with ONLY a JSON object, no prose, no code fence, with exactly these keys: ' +
      '"score" (number from -1 to 1), "label" (one of "positive","neutral","negative"), ' +
      '"intent" (short phrase: what the caller wants), "summary" (one sentence), ' +
      '"coaching" (one sentence of feedback for whoever answered), ' +
      '"riskFlags" (array of terse tags, MAX 4 WORDS EACH, e.g. "unpatched drywall", "repeat complaint"; empty array if none).\n\nTRANSCRIPT:\n' + text;
    return window.claude.complete(prompt).then(function (raw) {
      var parsed = null;
      try {
        var s = String(raw).replace(/```json|```/g, '').trim();
        var a = s.indexOf('{'), b = s.lastIndexOf('}');
        if (a > -1 && b > a) parsed = JSON.parse(s.slice(a, b + 1));
      } catch (e) { parsed = null; }
      var out = parsed
        ? {
            score: Number(parsed.score) || 0,
            label: parsed.label || 'neutral',
            intent: parsed.intent || '—',
            summary: parsed.summary || '',
            coaching: parsed.coaching || '',
            riskFlags: Array.isArray(parsed.riskFlags)
            ? parsed.riskFlags.map(function (f) { return String(f).split(/\s+/).slice(0, 4).join(' '); })
            : [],
            engine: 'claude'
          }
        : heuristic(text);
      updateCall(call.id, { sentiment: out });
      return out;
    }).catch(function () {
      var h = heuristic(text);
      updateCall(call.id, { sentiment: h });
      return h;
    });
  }

  function analyzeAll() {
    var pending = listCalls().filter(function (c) { return c.transcript && !c.sentiment; });
    return pending.reduce(function (chain, c) {
      return chain.then(function () { return analyze(c); });
    }, Promise.resolve()).then(function () { return pending.length; });
  }

  function callStats() {
    var calls = listCalls();
    var answered = calls.filter(function (c) { return c.outcome === 'answered'; });
    var missed = calls.filter(function (c) { return c.outcome === 'missed' || c.outcome === 'abandoned'; });
    var scored = calls.filter(function (c) { return c.sentiment && typeof c.sentiment.score === 'number'; });
    var avg = scored.length ? scored.reduce(function (a, c) { return a + c.sentiment.score; }, 0) / scored.length : null;
    var byChannel = {};
    calls.forEach(function (c) {
      var k = (c.source && c.source.label) || 'Unattributed';
      if (!byChannel[k]) byChannel[k] = { calls: 0, answered: 0, missed: 0, totalSec: 0, scored: 0, scoreSum: 0, channel: (c.source && c.source.channel) || 'unknown', number: (c.source && c.source.number) || '—' };
      var b = byChannel[k];
      b.calls++;
      if (c.outcome === 'answered') b.answered++; else b.missed++;
      b.totalSec += c.durationSec || 0;
      if (c.sentiment && typeof c.sentiment.score === 'number') { b.scored++; b.scoreSum += c.sentiment.score; }
    });
    return {
      total: calls.length,
      answered: answered.length,
      missed: missed.length,
      answerRate: calls.length ? Math.round((answered.length / calls.length) * 100) : 0,
      avgDurationSec: answered.length ? Math.round(answered.reduce(function (a, c) { return a + (c.durationSec || 0); }, 0) / answered.length) : 0,
      avgSentiment: avg == null ? null : Number(avg.toFixed(2)),
      unanalyzed: calls.filter(function (c) { return c.transcript && !c.sentiment; }).length,
      atRisk: calls.filter(function (c) { return c.sentiment && (c.sentiment.label === 'negative' || (c.sentiment.riskFlags || []).length); }).length,
      byChannel: byChannel
    };
  }

  function seedDemoCalls() {
    if (listCalls().length) return false;
    [
      {
        trackingNumber: '(407) 599-7803', fromNumber: '(407) 555-0142', callerCity: 'Winter Park',
        durationSec: 214, outcome: 'answered', answeredBy: 'Janzie', firstTime: true,
        startedAt: new Date(Date.now() - 3600e3 * 3).toISOString(),
        recordingUrl: null,
        transcript: 'Janzie: In Phaze Electric, this is Janzie.\nCaller: Hi — my breakers keep tripping when the dryer and the AC run together. The panel looks original to the house, 1978.\nJanzie: That sounds like a capacity issue rather than a bad breaker. We would come out and look before quoting anything — the estimate is free, and if the panel is fine we will tell you that.\nCaller: That is refreshing, honestly. The last company quoted me forty-two hundred over the phone without seeing it.\nJanzie: We would not do that. Grant can be there tomorrow between eight and ten, and he will text before he pulls up.\nCaller: Perfect. Thank you so much.'
      },
      {
        trackingNumber: '(407) 599-7801', fromNumber: '(407) 555-0198', callerCity: 'Lake Mary',
        durationSec: 168, outcome: 'answered', answeredBy: 'Janzie', firstTime: true,
        startedAt: new Date(Date.now() - 3600e3 * 7).toISOString(),
        transcript: 'Janzie: In Phaze Electric.\nCaller: I need a price on an EV charger install. Just got a Rivian.\nJanzie: Happy to. Is your garage on the same wall as your electrical panel?\nCaller: No, opposite side of the house.\nJanzie: Then the run length matters, so I would rather have Jason do a load calculation than guess. Most of ours land between six-fifty and nineteen hundred depending on the run and whether you have panel capacity.\nCaller: How much is the visit?\nJanzie: Nothing. Free estimate.\nCaller: Okay, that is reasonable. Let me talk to my wife and call back.'
      },
      {
        trackingNumber: '(407) 599-7802', fromNumber: '(321) 555-0170', callerCity: 'Oviedo',
        durationSec: 96, outcome: 'answered', answeredBy: 'Janzie', firstTime: true,
        startedAt: new Date(Date.now() - 3600e3 * 26).toISOString(),
        transcript: 'Caller: There is a warm outlet in my daughter nursery and I think I smell something burning.\nJanzie: Turn that breaker off right now if you can reach it safely.\nCaller: Okay — done.\nJanzie: Good. That is the right call. I am moving someone to you this afternoon, not tomorrow. Victor will be there by four.\nCaller: Thank you, I was really worried.'
      },
      {
        trackingNumber: '(407) 599-7777', fromNumber: '(407) 555-0311', callerCity: 'Orlando',
        durationSec: 0, outcome: 'missed', answeredBy: null, firstTime: false,
        startedAt: new Date(Date.now() - 3600e3 * 30).toISOString(),
        transcript: null
      },
      {
        trackingNumber: '(407) 599-7803', fromNumber: '(407) 555-0288', callerCity: 'Kissimmee',
        durationSec: 302, outcome: 'answered', answeredBy: 'Janzie', firstTime: false,
        startedAt: new Date(Date.now() - 3600e3 * 52).toISOString(),
        transcript: 'Caller: I am calling about the drywall. Your guys cut two holes to run the wire and nobody patched them. That was Thursday.\nJanzie: That is on us and I am sorry — patching is supposed to be part of the job, not an add-on.\nCaller: I have been waiting since Thursday and I have already had to move furniture twice.\nJanzie: I am putting you on Tony calendar for tomorrow morning and we are covering the patch and the paint. You will not see a charge for it.\nCaller: Fine. I just did not expect to have to call about it.\nJanzie: Understood. You should not have had to.'
      },
      {
        trackingNumber: '(407) 599-7804', fromNumber: '(407) 555-0455', callerCity: 'Maitland',
        durationSec: 41, outcome: 'voicemail', answeredBy: null, firstTime: true,
        startedAt: new Date(Date.now() - 3600e3 * 70).toISOString(),
        transcript: 'Voicemail: Hi, I got your name off the Google ad. I need someone to look at a generator install, twenty-two kilowatt. Call me back when you can, thanks.'
      }
    ].forEach(function (c) { createCall(c); });
    return true;
  }

  function exportCalls() {
    return JSON.stringify({ exportedAt: new Date().toISOString(), numbers: listNumbers(), calls: listCalls(), telephony: getTelephony() }, null, 2);
  }

  /* The body we expect from the provider, shown in the UI as the contract. */
  function ingestContract(provider) {
    if (provider === 'twilio') {
      return {
        note: 'Twilio status callback → your endpoint → POST here',
        CallSid: 'CAxxxxxxxx',
        From: '+14075550142',
        To: '+14075997803',
        CallStatus: 'completed',
        CallDuration: '214',
        RecordingUrl: 'https://api.twilio.com/.../Recordings/RExxxx',
        FromCity: 'WINTER PARK'
      };
    }
    return {
      note: 'CallRail webhook (Post-Call) → your endpoint → POST here',
      id: 'CAL123456789',
      customer_phone_number: '+14075550142',
      tracking_phone_number: '+14075997803',
      duration: '214',
      answered: true,
      first_call: true,
      recording: 'https://app.callrail.com/calls/.../recording',
      transcription: 'Janzie: In Phaze Electric, this is Janzie...',
      customer_city: 'Winter Park',
      start_time: '2026-08-19T14:12:04Z'
    };
  }

  window.InPhazeCalls = {
    OUTCOMES: OUTCOMES,
    listNumbers: listNumbers,
    setNumbers: setNumbers,
    getTelephony: getTelephony,
    setTelephony: setTelephony,
    listCalls: listCalls,
    createCall: createCall,
    ingest: ingest,
    fromProvider: fromProvider,
    updateCall: updateCall,
    deleteCall: deleteCall,
    analyze: analyze,
    analyzeAll: analyzeAll,
    callStats: callStats,
    seedDemoCalls: seedDemoCalls,
    exportCalls: exportCalls,
    ingestContract: ingestContract
  };
})();

/* ---------------------------------------------------------------------------
   In Phaze Electric — live review sync.

   Browsers cannot call Google/Yelp/Facebook review APIs directly: those keys
   must never ship to a client, and every one of them blocks cross-origin
   requests. So this module talks to ONE endpoint you control — your sync worker
   — which holds the keys server-side, queries each platform, and returns the
   normalized shape below. Everything on the public site reads from the cache
   this module writes, so the site never waits on a third party.

   Storage keys owned here:
     inphaze.reviewsync.v1  — provider config + endpoint
     inphaze.reviewcache.v1 — last successful payload (what the site renders)
--------------------------------------------------------------------------- */
(function () {
  var SK = 'inphaze.reviewsync.v1';
  var CACHE = 'inphaze.reviewcache.v1';

  function read(k, fallback) {
    try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? fallback : v; }
    catch (e) { return fallback; }
  }
  function write(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; }
    catch (e) { console.warn('[InPhazeReviews] storage blocked', e); return false; }
  }
  function uid(p) { return (p || 'rv') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  /* Each provider: what the worker needs to query it, and how it is identified. */
  var PROVIDERS = [
    {
      key: 'google', label: 'Google Business Profile', color: '#34A853', weight: 1,
      api: 'Google Business Profile API (accounts.locations.reviews)',
      needs: [
        { field: 'placeId', label: 'Place ID', hint: 'ChIJ… — find at Google Place ID finder' },
        { field: 'locationId', label: 'GBP Location ID', hint: 'accounts/123/locations/456' }
      ],
      notes: 'The one that matters most. GBP API needs OAuth on the owning Google account — set it up once in the worker, not here. Reviews cannot be fetched by an API key alone.'
    },
    {
      key: 'yelp', label: 'Yelp', color: '#D32323', weight: 1,
      api: 'Yelp Fusion API (/businesses/{id}/reviews)',
      needs: [{ field: 'businessId', label: 'Yelp business ID', hint: 'in-phaze-electric-orlando' }],
      notes: 'Fusion returns rating and total count reliably, but only three review excerpts. Use it for the count, not the corpus.'
    },
    {
      key: 'facebook', label: 'Facebook', color: '#1877F2', weight: 1,
      api: 'Meta Graph API (/{page-id}/ratings)',
      needs: [
        { field: 'pageId', label: 'Page ID', hint: 'numeric page id' },
        { field: 'tokenRef', label: 'Page token ref', hint: 'name of the secret in your worker' }
      ],
      notes: 'Needs a long-lived Page access token with pages_read_engagement. Store the token in the worker; only its name goes here.'
    },
    {
      key: 'angi', label: 'Angi', color: '#FF6153', weight: 1,
      api: 'No public reviews API',
      needs: [{ field: 'profileUrl', label: 'Profile URL', hint: 'https://www.angi.com/companylist/…' }],
      notes: 'No API. Either enter the count manually each month, or have the worker scrape your own public profile — which is your data, but check their terms.'
    },
    {
      key: 'homeadvisor', label: 'HomeAdvisor', color: '#F68A1E', weight: 1,
      api: 'No public reviews API',
      needs: [{ field: 'profileUrl', label: 'Profile URL', hint: 'https://www.homeadvisor.com/rated…' }],
      notes: 'Same as Angi — shares the parent company. Manual entry or your-own-profile scrape.'
    },
    {
      key: 'houzz', label: 'Houzz', color: '#4DBC15', weight: 1,
      api: 'No public reviews API',
      needs: [{ field: 'profileUrl', label: 'Profile URL', hint: 'https://www.houzz.com/professionals/…' }],
      notes: 'Manual entry. Low volume for this trade, but it carries a 5.0 worth showing.'
    },
    {
      key: 'bbb', label: 'BBB', color: '#0A4F8F', weight: 0,
      api: 'No public API',
      needs: [{ field: 'profileUrl', label: 'BBB profile URL', hint: 'https://www.bbb.org/us/fl/orlando/…' }],
      notes: 'Rating only, not a review count. Excluded from the aggregate by default (weight 0) so it cannot skew the average.'
    },
    {
      key: 'nextdoor', label: 'Nextdoor', color: '#00613E', weight: 0,
      api: 'No public API',
      needs: [{ field: 'profileUrl', label: 'Business page URL', hint: 'nextdoor.com/pages/…' }],
      notes: 'Recommendations, not star ratings. Great social proof, kept out of the numeric aggregate.'
    }
  ];

  function defaults() {
    var providers = {};
    PROVIDERS.forEach(function (p) {
      providers[p.key] = {
        enabled: p.key === 'google',
        ids: {},
        manual: { count: null, rating: null },
        last: null
      };
    });
    return {
      endpoint: '',
      secretRef: '',
      intervalMinutes: 720,
      autoSync: true,
      publishThreshold: 5,
      providers: providers,
      log: []
    };
  }

  function getConfig() {
    var c = read(SK, null);
    if (!c) { c = defaults(); write(SK, c); }
    if (!c.log) c.log = [];
    if (!c.providers) c.providers = defaults().providers;
    PROVIDERS.forEach(function (p) {
      if (!c.providers[p.key]) c.providers[p.key] = { enabled: false, ids: {}, manual: { count: null, rating: null }, last: null };
      if (!c.providers[p.key].ids) c.providers[p.key].ids = {};
      if (!c.providers[p.key].manual) c.providers[p.key].manual = { count: null, rating: null };
    });
    return c;
  }

  function setConfig(patch) {
    var c = getConfig();
    for (var k in patch) if (Object.prototype.hasOwnProperty.call(patch, k)) c[k] = patch[k];
    write(SK, c);
    return c;
  }

  function setProvider(key, patch) {
    var c = getConfig();
    c.providers[key] = Object.assign({}, c.providers[key], patch);
    write(SK, c);
    return c.providers[key];
  }

  function setProviderId(key, field, value) {
    var c = getConfig();
    c.providers[key].ids[field] = value;
    write(SK, c);
    return c.providers[key];
  }

  function setManual(key, field, value) {
    var c = getConfig();
    var n = value === '' || value == null ? null : Number(value);
    c.providers[key].manual[field] = isNaN(n) ? null : n;
    write(SK, c);
    return c.providers[key];
  }

  function logSync(entry) {
    var c = getConfig();
    c.log.unshift(Object.assign({ at: new Date().toISOString(), id: uid('sy') }, entry));
    c.log = c.log.slice(0, 40);
    write(SK, c);
    return c.log[0];
  }

  /* The cache is what the public site renders. Never let a page hit a platform. */
  function getCache() {
    return read(CACHE, {
      fetchedAt: null,
      totalCount: 0,
      weightedRating: null,
      byProvider: {},
      recent: [],
      geo: [],
      source: 'empty'
    });
  }

  function aggregate(byProvider) {
    var count = 0, weighted = 0, weightTotal = 0;
    PROVIDERS.forEach(function (p) {
      var r = byProvider[p.key];
      if (!r || !r.count) return;
      count += r.count;
      if (p.weight && r.rating) { weighted += r.rating * r.count; weightTotal += r.count; }
    });
    return {
      totalCount: count,
      weightedRating: weightTotal ? Number((weighted / weightTotal).toFixed(2)) : null
    };
  }

  function writeCache(byProvider, recent, geo, source) {
    var agg = aggregate(byProvider);
    var payload = {
      fetchedAt: new Date().toISOString(),
      totalCount: agg.totalCount,
      weightedRating: agg.weightedRating,
      byProvider: byProvider,
      recent: recent || [],
      geo: geo || [],
      source: source || 'worker'
    };
    write(CACHE, payload);
    return payload;
  }

  /* Build the request the worker receives, so the contract is visible in the UI. */
  function buildRequest() {
    var c = getConfig();
    var want = {};
    PROVIDERS.forEach(function (p) {
      var pc = c.providers[p.key];
      if (pc.enabled) want[p.key] = { ids: pc.ids, api: p.api };
    });
    return {
      action: 'reviews.sync',
      requestedAt: new Date().toISOString(),
      business: { name: 'In Phaze Electric Inc.', city: 'Orlando', state: 'FL', phone: '(407) 599-7777' },
      providers: want,
      include: { recentReviews: 25, geo: true, perServiceTags: true }
    };
  }

  /* What the worker must return. Documented in the CRM so a dev can build to it. */
  function responseContract() {
    return {
      fetchedAt: '2026-08-19T14:02:11Z',
      byProvider: {
        google: { count: 643, rating: 4.8, url: 'https://g.page/r/…' },
        yelp: { count: 41, rating: 4.5, url: 'https://yelp.com/biz/…' },
        facebook: { count: 58, rating: 4.9, url: 'https://facebook.com/…' }
      },
      recent: [
        {
          platform: 'google',
          author: 'D. Whitfield',
          rating: 5,
          text: 'He discovered the panels were fine, so he saved me a lot of money.',
          city: 'Winter Park',
          serviceTag: 'Panels',
          publishedAt: '2026-08-17T19:40:00Z',
          url: 'https://…'
        }
      ],
      geo: [
        { city: 'Winter Park', lat: 28.5999, lng: -81.3392, count: 88, avgRating: 4.9 }
      ]
    };
  }

  function normalizeProviderBlock(raw) {
    var out = {};
    var c = getConfig();
    PROVIDERS.forEach(function (p) {
      var pc = c.providers[p.key];
      var fromApi = raw && raw[p.key];
      if (fromApi && (fromApi.count || fromApi.rating)) {
        out[p.key] = {
          count: Number(fromApi.count) || 0,
          rating: fromApi.rating == null ? null : Number(fromApi.rating),
          url: fromApi.url || null,
          origin: 'api'
        };
      } else if (pc.enabled && (pc.manual.count || pc.manual.rating)) {
        out[p.key] = {
          count: Number(pc.manual.count) || 0,
          rating: pc.manual.rating == null ? null : Number(pc.manual.rating),
          url: pc.ids.profileUrl || null,
          origin: 'manual'
        };
      }
    });
    return out;
  }

  /* Manual-only aggregate: works with zero infrastructure, which is how Tony
     gets accurate numbers on the site this week rather than next quarter. */
  function syncManual() {
    var byProvider = normalizeProviderBlock(null);
    var payload = writeCache(byProvider, getCache().recent, getCache().geo, 'manual');
    logSync({ ok: true, note: 'Recalculated from manual counts', total: payload.totalCount, engine: 'manual' });
    return Promise.resolve({ ok: true, payload: payload });
  }

  function sync() {
    var c = getConfig();
    if (!c.endpoint) return syncManual();
    var headers = { 'Content-Type': 'application/json' };
    if (c.secretRef) headers['X-InPhaze-Signature'] = c.secretRef;
    return fetch(c.endpoint, { method: 'POST', headers: headers, body: JSON.stringify(buildRequest()) })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        var byProvider = normalizeProviderBlock(data.byProvider);
        var payload = writeCache(byProvider, data.recent || [], data.geo || [], 'worker');
        var cfg = getConfig();
        Object.keys(byProvider).forEach(function (k) {
          cfg.providers[k].last = { at: payload.fetchedAt, count: byProvider[k].count, rating: byProvider[k].rating };
        });
        write(SK, cfg);
        logSync({ ok: true, note: 'Synced ' + Object.keys(byProvider).length + ' platforms', total: payload.totalCount, engine: 'worker' });
        return { ok: true, payload: payload };
      })
      .catch(function (err) {
        logSync({ ok: false, note: String(err && err.message || err), engine: 'worker' });
        return { ok: false, error: String(err && err.message || err) };
      });
  }

  /* Public-site read API. Falls back to the last known-good figures so a failed
     sync can never blank the proof chip on the homepage. */
  function publicFigures(fallbackCount, fallbackRating) {
    var cache = getCache();
    if (cache.totalCount >= (getConfig().publishThreshold || 0) && cache.totalCount > 0) {
      return {
        count: cache.totalCount,
        rating: cache.weightedRating || fallbackRating || 4.8,
        fetchedAt: cache.fetchedAt,
        live: true,
        byProvider: cache.byProvider
      };
    }
    return {
      count: fallbackCount || 801,
      rating: fallbackRating || 4.8,
      fetchedAt: null,
      live: false,
      byProvider: cache.byProvider || {}
    };
  }

  /* Seed geo distribution from our known review-by-city counts so the homepage
     map is real on day one and gets replaced by worker data on first sync. */
  var SEED_GEO = [
    { city: 'Orlando', lat: 28.5384, lng: -81.3789, count: 312, avgRating: 4.8 },
    { city: 'Winter Park', lat: 28.5999, lng: -81.3392, count: 88, avgRating: 4.9 },
    { city: 'Kissimmee', lat: 28.2920, lng: -81.4076, count: 44, avgRating: 4.7 },
    { city: 'Maitland', lat: 28.6278, lng: -81.3631, count: 41, avgRating: 4.9 },
    { city: 'Longwood', lat: 28.7031, lng: -81.3384, count: 36, avgRating: 4.8 },
    { city: 'Lake Mary', lat: 28.7589, lng: -81.3178, count: 29, avgRating: 4.9 },
    { city: 'Winter Garden', lat: 28.5653, lng: -81.5862, count: 27, avgRating: 4.8 },
    { city: 'Oviedo', lat: 28.6700, lng: -81.2081, count: 22, avgRating: 4.8 },
    { city: 'St. Cloud', lat: 28.2489, lng: -81.2812, count: 19, avgRating: 4.7 },
    { city: 'Apopka', lat: 28.6934, lng: -81.5322, count: 18, avgRating: 4.8 },
    { city: 'Sanford', lat: 28.8029, lng: -81.2695, count: 16, avgRating: 4.7 },
    { city: 'Windermere', lat: 28.4953, lng: -81.5348, count: 14, avgRating: 5.0 }
  ];

  function geoPins() {
    var cache = getCache();
    if (cache.geo && cache.geo.length) return cache.geo;
    return SEED_GEO;
  }

  function seedDemoSync() {
    var byProvider = {
      google: { count: 643, rating: 4.8, url: 'https://g.page/r/inphaze', origin: 'api' },
      yelp: { count: 41, rating: 4.5, url: 'https://yelp.com/biz/in-phaze-electric-orlando', origin: 'api' },
      facebook: { count: 58, rating: 4.9, url: 'https://facebook.com/inphazeelectric', origin: 'api' },
      angi: { count: 34, rating: 4.8, url: null, origin: 'manual' },
      homeadvisor: { count: 19, rating: 4.9, url: null, origin: 'manual' },
      houzz: { count: 6, rating: 5.0, url: null, origin: 'manual' }
    };
    var payload = writeCache(byProvider, getCache().recent, SEED_GEO, 'sample');
    logSync({ ok: true, note: 'Loaded sample sync payload', total: payload.totalCount, engine: 'sample' });
    return payload;
  }

  function clearCache() {
    write(CACHE, {
      fetchedAt: null, totalCount: 0, weightedRating: null,
      byProvider: {}, recent: [], geo: [], source: 'empty'
    });
    logSync({ ok: true, note: 'Cache cleared — site fell back to published figures', engine: 'manual' });
  }

  function stats() {
    var c = getConfig();
    var cache = getCache();
    var enabled = PROVIDERS.filter(function (p) { return c.providers[p.key].enabled; });
    var configured = enabled.filter(function (p) {
      var pc = c.providers[p.key];
      var hasId = Object.keys(pc.ids).some(function (k) { return pc.ids[k]; });
      var hasManual = pc.manual.count || pc.manual.rating;
      return hasId || hasManual;
    });
    var stale = null;
    if (cache.fetchedAt) {
      stale = Math.round((Date.now() - new Date(cache.fetchedAt).getTime()) / 60000);
    }
    return {
      enabled: enabled.length,
      configured: configured.length,
      totalProviders: PROVIDERS.length,
      cachedCount: cache.totalCount,
      cachedRating: cache.weightedRating,
      minutesSinceSync: stale,
      source: cache.source,
      endpointSet: !!c.endpoint
    };
  }

  window.InPhazeReviews = {
    PROVIDERS: PROVIDERS,
    SEED_GEO: SEED_GEO,
    getConfig: getConfig,
    setConfig: setConfig,
    setProvider: setProvider,
    setProviderId: setProviderId,
    setManual: setManual,
    getCache: getCache,
    sync: sync,
    syncManual: syncManual,
    buildRequest: buildRequest,
    responseContract: responseContract,
    publicFigures: publicFigures,
    geoPins: geoPins,
    seedDemoSync: seedDemoSync,
    clearCache: clearCache,
    stats: stats
  };

  /* This file is appended asynchronously, so a page's first render can happen
     before we exist — in which case it renders published fallback figures.
     Announce readiness so every page can force exactly one corrective render. */
  try {
    window.dispatchEvent(new CustomEvent('inphaze:reviews-ready'));
  } catch (e) {
    var ev = document.createEvent('Event');
    ev.initEvent('inphaze:reviews-ready', true, true);
    window.dispatchEvent(ev);
  }
})();


