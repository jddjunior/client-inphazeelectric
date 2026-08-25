/* In Phaze Electric — page content for every URL in the SEO architecture.
   One record per route. The route templates read these; nothing is auto-spun.

   VERIFY BEFORE PUBLISH: utility territory and permit office per city are the
   two facts that change and that Google rewards for accuracy. Each city record
   carries `verify: true` until Tony's office confirms it.
*/
(function () {

  var SERVICES = [
    {
      slug: 'electrical-panel-upgrade',
      nav: 'Panel upgrades',
      h1: 'Electrical panel upgrades in Orlando',
      eyebrow: 'MOST REQUESTED · PERMITTED & INSPECTED',
      lede: '100-amp to 200-amp service, usually finished in one day. Free estimate — and if your panel is fine, we will tell you that instead of selling you one.',
      priceRange: '$2,400 – $4,800',
      priceNote: 'Most Orlando homes land in the middle of that range. What moves it: meter can condition, mast and riser work, whether the utility needs to drop service, and how far the panel sits from the meter.',
      keywords: ['electrical panel upgrade orlando', '200 amp panel cost', 'breaker box replacement near me', 'fuse box replacement orlando', 'electrical service upgrade'],
      signsTitle: 'Signs you actually need this',
      signs: [
        'Breakers trip when two big appliances run together',
        'You still have a fuse box, or a 60/100-amp service',
        'No room left for a new circuit — every slot is doubled up',
        'Federal Pacific Stab-Lok or Zinsco panel (known failure risk)',
        'Scorch marks, a warm panel cover, or a burning smell',
        'You are adding an EV charger, pool heater, or second AC'
      ],
      costTiers: [
        { label: '100A → 200A, panel swap only', range: '$2,400 – $3,200', what: 'Same location, meter can reusable, no mast work. One day.' },
        { label: '200A with meter can & riser', range: '$3,200 – $4,200', what: 'New meter enclosure, mast, weatherhead, utility coordination.' },
        { label: 'Relocation or full service rebuild', range: '$4,200 – $6,500', what: 'Panel moves, new grounding electrode system, trenching or new feeder.' }
      ],
      dayTitle: 'How the day goes',
      day: [
        { time: '7:45am', what: 'Your electrician texts before he pulls up. Boots covered, drop cloths down.' },
        { time: '8:15am', what: 'Utility disconnect or meter pull. Power is off from here.' },
        { time: '8:30am', what: 'Old panel out. Circuits mapped and labeled as they come off.' },
        { time: '11:00am', what: 'New panel set, feeders terminated, lugs torqued to spec, grounding and bonding corrected.' },
        { time: '2:00pm', what: 'Circuits landed and labeled — properly, not in pencil. AFCI/GFCI where code requires.' },
        { time: '3:30pm', what: 'Power back on, every circuit tested. Inspection scheduled by our office.' },
        { time: 'Next day', what: 'Inspector visits. We meet him. You do not have to be home.' }
      ],
      faqs: [
        { q: 'Do I really need 200 amps?', a: 'Not always. If you are not adding load, a 100-amp service in good condition can be fine. We do a load calculation first — if the answer is no, we say no.' },
        { q: 'How long is the power off?', a: 'Typically six to eight hours in one day. We schedule it in the morning so you are back on by dinner.' },
        { q: 'Who pulls the permit?', a: 'We do. Janzie files it, schedules the inspection, and meets the inspector. You handle nothing.' },
        { q: 'Will you patch the wall?', a: 'Yes. If we open drywall we close it. That is part of the job, not a change order.' },
        { q: 'Is a Federal Pacific panel really dangerous?', a: 'Stab-Lok breakers have a documented failure-to-trip rate. We will show you what is in your panel and let you decide with real information.' },
        { q: 'Does this help my insurance?', a: 'Often. Many Florida carriers surcharge or refuse policies on fuse boxes and known-defect panels. Ask your agent before you schedule.' },
        { q: 'Can you do it while I am at work?', a: 'Yes, with a key or code and a way to reach you. Most of our panel swaps happen with nobody home.' },
        { q: 'What is the warranty?', a: 'One year on all labor, plus the manufacturer warranty on the panel and breakers.' }
      ],
      permits: 'Panel and service changes require a permit and inspection everywhere in Central Florida, and the utility has to release and reconnect the meter. We coordinate both. In Orange County and the City of Orlando that is typically a same-week inspection; utility coordination is what sets the schedule, not the paperwork.',
      proofTag: 'Panels'
    },
    {
      slug: 'ev-charger-installation',
      nav: 'EV chargers',
      h1: 'EV charger installation in Orlando',
      eyebrow: 'FASTEST GROWING · LOAD CALC FIRST',
      lede: 'Tesla, Ford, Rivian, Hyundai, universal J1772. We run a load calculation before we quote, so you are not paying for a service upgrade you do not need.',
      priceRange: '$650 – $1,900',
      priceNote: 'Short garage run on an existing panel with capacity is the low end. Long runs, exterior conduit, subpanels, or a service upgrade push it up.',
      keywords: ['ev charger installation orlando', 'tesla wall connector installer orlando', 'level 2 charger install cost', 'ev charger electrician near me'],
      signsTitle: 'What decides your price',
      signs: [
        'Distance from panel to parking spot — every foot of wire costs',
        'Whether your panel has two free slots and spare capacity',
        'Indoor drywall run versus exterior conduit',
        'Charger amperage — 32A, 40A, or 48A changes the wire size',
        'Whether the run crosses masonry, an attic, or a slab',
        'Hardwired versus a NEMA 14-50 receptacle'
      ],
      costTiers: [
        { label: 'Receptacle or charger near the panel', range: '$650 – $950', what: 'Under 20 feet, existing capacity, NEMA 14-50 or hardwired 40A.' },
        { label: 'Typical garage install', range: '$950 – $1,400', what: '20–60 foot run, conduit where exposed, dedicated 50–60A circuit.' },
        { label: 'Long run, subpanel, or load management', range: '$1,400 – $1,900', what: 'Opposite side of the house, detached garage, or a load-sharing device instead of a service upgrade.' }
      ],
      dayTitle: 'How the install goes',
      day: [
        { time: 'Estimate', what: 'Load calculation on your actual panel — not a guess from the phone.' },
        { time: 'Hour 1', what: 'Circuit laid out, route confirmed with you before a single hole is drilled.' },
        { time: 'Hour 2', what: 'Wire pulled, conduit strapped and straight. It should look like it came with the house.' },
        { time: 'Hour 3', what: 'Charger mounted, breaker landed, panel relabeled.' },
        { time: 'Hour 4', what: 'Commissioned, app paired, and we watch it pull real current before we leave.' }
      ],
      faqs: [
        { q: 'Do I need a panel upgrade for an EV charger?', a: 'Usually not. A load calculation tells us for certain, and load-management devices can often avoid an upgrade entirely. We have talked plenty of people out of a $3,000 upgrade they did not need.' },
        { q: 'Hardwired or plug-in?', a: 'Hardwired is slightly more efficient and tidier; a 14-50 receptacle is more flexible if you change cars. We will tell you which fits your setup.' },
        { q: 'How long does it take?', a: 'Most installs are half a day. Long runs or a subpanel can take a full day.' },
        { q: 'Are there rebates in Central Florida?', a: 'Utility and federal incentives change year to year. Ask us what is current when you call — we track them because our customers ask.' },
        { q: 'Can you install a charger I already bought?', a: 'Yes, any listed unit. We are not tied to one brand.' },
        { q: 'Two cars, two chargers?', a: 'Common. Load management lets two chargers share a circuit intelligently instead of doubling your service.' },
        { q: 'Do I need a permit?', a: 'Yes, an EV circuit is permitted work. We file it.' },
        { q: 'Outdoor install in Florida weather?', a: 'Fine with a listed outdoor-rated unit and proper conduit. Ninety percent of our failures on other people\'s work are bad exterior penetrations.' }
      ],
      permits: 'EV circuits are permitted electrical work in every Central Florida jurisdiction. It is a fast permit and a quick inspection — the only thing that slows it down is an installer who skipped it, which is also how you void your homeowner\'s coverage.',
      proofTag: 'EV chargers'
    },
    {
      slug: 'surge-lightning-protection',
      nav: 'Surge protection',
      h1: 'Whole-home surge & lightning protection',
      eyebrow: 'FLORIDA ESSENTIAL · WE LEAD THE COUNTRY IN STRIKES',
      lede: 'Central Florida gets more lightning than anywhere else in the United States. A whole-home suppressor at the panel is the cheapest insurance in this trade.',
      priceRange: '$550 – $1,400',
      priceNote: 'A quality Type 2 device at the panel is the low end. Layered protection — panel plus point-of-use at AC, well pump, and electronics — is the upper end.',
      keywords: ['whole home surge protector orlando', 'lightning protection florida', 'surge protector installation cost', 'panel surge suppressor'],
      signsTitle: 'Why this is not optional here',
      signs: [
        'Central Florida averages the highest lightning density in the country',
        'A near strike does not have to hit your house to destroy electronics',
        'AC boards, well pumps, and pool equipment are the usual first casualties',
        'Power-strip surge protectors do nothing about a service-entrance surge',
        'Utility side and load side both need protection to work properly',
        'Most policies cover fire, not the slow degradation surges cause'
      ],
      costTiers: [
        { label: 'Type 2 panel device', range: '$550 – $800', what: 'Installed at the service panel, protects everything downstream. Two hours.' },
        { label: 'Panel plus point-of-use layer', range: '$800 – $1,100', what: 'Panel device plus protection at AC condenser and sensitive equipment.' },
        { label: 'Full layered system', range: '$1,100 – $1,400', what: 'Service entrance, subpanels, AC, well, pool, and low-voltage lines.' }
      ],
      dayTitle: 'How it goes',
      day: [
        { time: 'Hour 1', what: 'Panel inspected — grounding and bonding get verified first, because a suppressor without a good ground is decoration.' },
        { time: 'Hour 2', what: 'Device installed with the shortest possible lead length. Lead length is most of the performance.' },
        { time: 'Wrap-up', what: 'Indicator lights explained, warranty paperwork registered for you.' }
      ],
      faqs: [
        { q: 'Do power strips not already do this?', a: 'No. A strip clamps small transients at one outlet. A service-entrance surge comes in on the feeders and reaches everything at once.' },
        { q: 'How long do they last?', a: 'They wear out absorbing hits. Good devices show status with an indicator; we tell you what to look for and check it on any future visit.' },
        { q: 'Does it stop a direct strike?', a: 'Nothing stops a direct strike to the structure. This handles the far more common case — nearby strikes and utility switching surges.' },
        { q: 'Will it protect my AC?', a: 'A panel device helps. For the compressor and control board specifically, a dedicated device at the condenser is the better answer.' },
        { q: 'Is grounding part of this?', a: 'It is the part that matters most, and it is the part most often wrong. We verify and correct grounding before installing anything.' },
        { q: 'Any insurance benefit?', a: 'Some carriers give credit. Worth a call to your agent with the model number we install.' }
      ],
      permits: 'A panel-mounted suppressor is typically a straightforward permitted addition, and in some jurisdictions it rides along with other panel work. Grounding corrections, which we often find are needed, are inspected work.',
      proofTag: 'Panels'
    },
    {
      slug: 'generator-installation',
      nav: 'Generators',
      h1: 'Standby generator installation',
      eyebrow: 'HURRICANE SEASON · AUTOMATIC TRANSFER',
      lede: 'Whole-home and essential-circuit standby systems with automatic transfer switches. Sized on your actual load, not a sales chart.',
      priceRange: '$6,500 – $18,000',
      priceNote: 'Electrical and transfer switch work is our scope. Fuel line and pad work varies, and total cost depends on generator size, gas versus propane, and distance to the panel.',
      keywords: ['generator installation orlando', 'generac installer central florida', 'whole house generator cost', 'automatic transfer switch install'],
      signsTitle: 'What to decide first',
      signs: [
        'Whole-home versus essential circuits — this drives everything',
        'Natural gas availability at your address, or propane tank siting',
        'Where the pad can go: clearances from windows, doors, and the meter',
        'Automatic transfer switch versus manual interlock',
        'Whether your existing panel can host the transfer equipment',
        'HOA and setback rules — real constraints in a lot of Orlando neighborhoods'
      ],
      costTiers: [
        { label: 'Essential circuits, 11–14kW', range: '$6,500 – $9,500', what: 'AC, fridge, well, key outlets and lights. Transfer switch and pad.' },
        { label: 'Whole home, 18–22kW', range: '$9,500 – $14,000', what: 'Full-service automatic transfer, most homes under 3,000 sq ft.' },
        { label: 'Large home or 24kW+', range: '$14,000 – $18,000', what: 'Multiple AC systems, long fuel or feeder runs, subpanel reconfiguration.' }
      ],
      dayTitle: 'How the project goes',
      day: [
        { time: 'Day 1', what: 'Load calculation, siting walk, and the honest conversation about whole-home versus essential circuits.' },
        { time: 'Day 1–2', what: 'Permit filed. Pad prepared. Fuel coordination scheduled.' },
        { time: 'Day 2', what: 'Generator set, transfer switch installed, feeders run.' },
        { time: 'Day 3', what: 'Commissioning: simulated outage, transfer timing verified, exercise schedule set.' },
        { time: 'After', what: 'Inspection, then we walk you through the monthly self-test and what the alarms mean.' }
      ],
      faqs: [
        { q: 'Whole home or essential circuits?', a: 'Essential circuits cost far less and cover what actually matters in an outage. We size both and let you see the difference in writing.' },
        { q: 'How fast does it transfer?', a: 'Automatic switches typically transfer in 10–30 seconds after detecting loss of utility power.' },
        { q: 'How loud is it?', a: 'Modern enclosures run roughly like a loud AC unit. Siting matters more than the spec sheet — we look at where your bedrooms are.' },
        { q: 'Natural gas or propane?', a: 'Natural gas if it is at the street: no refueling. Propane means a tank, but works where gas does not run.' },
        { q: 'Does it need maintenance?', a: 'Yes — oil, filters, and an annual check. It is a small engine that sits outside in Florida.' },
        { q: 'Can you service what someone else installed?', a: 'Usually. We will inspect the transfer switch and grounding first, because that is where the shortcuts hide.' },
        { q: 'How far ahead of hurricane season?', a: 'Well ahead. Lead times and permit queues both stretch in June, and everyone calls the same week a storm forms.' }
      ],
      permits: 'Generator installs are permitted and inspected, and often involve a gas permit alongside the electrical. Some jurisdictions and HOAs add setback review. Our office runs the permit; we will tell you early if your siting has a problem.',
      proofTag: 'Panels'
    },
    {
      slug: 'lighting-installation',
      nav: 'Lighting',
      h1: 'Lighting installation & LED retrofits',
      eyebrow: 'RECESSED · FIXTURES · LANDSCAPE',
      lede: 'Recessed cans, LED retrofits, chandeliers, under-cabinet, landscape and dock lighting. Laid out before we cut, so the ceiling looks deliberate.',
      priceRange: 'From $180 per fixture',
      priceNote: 'Per-fixture pricing drops sharply with quantity. A twelve-can living room costs far less per light than a single can added to a finished ceiling.',
      keywords: ['recessed lighting installation orlando', 'led retrofit orlando', 'chandelier installation', 'landscape lighting orlando electrician'],
      signsTitle: 'What we do most',
      signs: [
        'Recessed can layouts — spacing planned, not eyeballed',
        'LED retrofits in existing cans, including dimmer compatibility',
        'Heavy fixtures and chandeliers, including two-story foyers',
        'Under-cabinet and toe-kick lighting during kitchen remodels',
        'Landscape, path, and dock lighting with timers and photocells',
        'Dimmer and smart-switch upgrades that actually stop the flicker'
      ],
      costTiers: [
        { label: 'Single fixture swap', range: '$180 – $350', what: 'Existing box, standard height. Chandeliers and high ceilings cost more.' },
        { label: 'Recessed cans, 6–12 lights', range: '$1,400 – $3,200', what: 'New circuit if needed, layout drawn first, drywall patched.' },
        { label: 'Landscape or dock package', range: '$2,000 – $6,000', what: 'Low-voltage transformer, buried runs, timer and photocell control.' }
      ],
      dayTitle: 'How it goes',
      day: [
        { time: 'Layout', what: 'Cans marked on the ceiling and reviewed with you before a hole saw touches drywall.' },
        { time: 'Rough-in', what: 'Circuit run, boxes and housings set, joists respected.' },
        { time: 'Trim', what: 'Fixtures installed, dimmers matched to the drivers so nothing buzzes or flickers.' },
        { time: 'Clean', what: 'Drywall dust vacuumed, patches finished. Our reviews say "no mess" more than they say anything else.' }
      ],
      faqs: [
        { q: 'How many recessed lights do I need?', a: 'Depends on ceiling height, room size, and what the room is for. We lay it out on the ceiling first so you see it before it is permanent.' },
        { q: 'Why do my LEDs flicker?', a: 'Almost always a dimmer that does not match the driver. It is a cheap fix and we carry the right dimmers.' },
        { q: 'Can you add lights without tearing up the ceiling?', a: 'Usually yes — remodel housings are made for finished ceilings. We cut once, in the right place.' },
        { q: 'Do you patch the drywall?', a: 'Yes. Patch and texture included on our lighting work.' },
        { q: 'Can you hang a heavy chandelier?', a: 'Yes, with a fixture-rated box and proper support. Weight and ceiling type decide the approach.' },
        { q: 'Smart lighting?', a: 'We install smart switches and dimmers that work without a hub subscription, and we will tell you which ecosystems age badly.' }
      ],
      permits: 'Adding new circuits is permitted work; swapping a fixture on an existing circuit generally is not. Remodel and addition lighting falls under the project permit.',
      proofTag: 'Lighting'
    },
    {
      slug: 'rewiring-remodels',
      nav: 'Rewires & remodels',
      h1: 'Rewiring, remodels & additions',
      eyebrow: 'CLOTH WIRING · ALUMINUM · WHOLE-HOME',
      lede: 'Full and partial rewires, kitchen and bath remodels, additions and garage conversions. Old Central Florida housing stock is our daily work.',
      priceRange: '$4,000 – $22,000',
      priceNote: 'Partial rewires and single-room remodels sit at the low end. A full rewire on a 1940s bungalow with plaster walls is the top of the range.',
      keywords: ['house rewiring orlando', 'aluminum wiring replacement orlando', 'cloth wiring replacement', 'kitchen remodel electrician orlando'],
      signsTitle: 'When a rewire is the real answer',
      signs: [
        'Cloth-insulated wiring that crumbles when you touch it',
        'Knob-and-tube still in service anywhere in the house',
        'Aluminum branch wiring from the 1960s–70s',
        'Two-prong outlets with no ground anywhere in the room',
        'Insurance carrier asking for documentation or refusing to renew',
        'Adding a kitchen, bath, or addition to a house already at capacity'
      ],
      costTiers: [
        { label: 'Partial rewire or single room', range: '$4,000 – $7,500', what: 'Kitchen, bath, or one problem zone. Dedicated circuits, GFCI/AFCI.' },
        { label: 'Kitchen or bath remodel package', range: '$6,000 – $12,000', what: 'Appliance circuits, lighting, disposal, GFCI layout, inspections.' },
        { label: 'Full home rewire', range: '$12,000 – $22,000', what: 'Whole-house branch circuits, new panel, drywall repair and paint-ready patching.' }
      ],
      dayTitle: 'How the project goes',
      day: [
        { time: 'Walkthrough', what: 'We open a few strategic spots to see what is actually in the walls before quoting.' },
        { time: 'Plan', what: 'Circuit schedule and access points marked. You know where we will open drywall before we do it.' },
        { time: 'Rough-in', what: 'New home runs pulled, boxes set, old wiring abandoned safely — not just left hot in a wall.' },
        { time: 'Inspection', what: 'Rough inspection before anything closes up.' },
        { time: 'Trim & close', what: 'Devices, plates, panel labeled. Then patching, texture, and a house that looks untouched.' }
      ],
      faqs: [
        { q: 'Can you rewire without gutting the house?', a: 'Mostly, yes. We cut strategically and patch what we open. Plaster and masonry take more openings than drywall.' },
        { q: 'Is aluminum wiring dangerous?', a: 'It needs proper terminations and connectors. Sometimes the right answer is remediation at every device rather than a full rewire — that is a much smaller number.' },
        { q: 'Do we have to move out?', a: 'Rarely. We stage the work so you keep power in most of the house most of the time.' },
        { q: 'Will insurance require it?', a: 'Carriers increasingly ask about cloth, knob-and-tube, and aluminum. Documentation of remediation often satisfies them.' },
        { q: 'Do you handle the drywall?', a: 'Patch and texture, yes. We close what we open — that promise came directly from customer feedback.' },
        { q: 'How long does a full rewire take?', a: 'Typically one to two weeks depending on size, wall construction, and inspection scheduling.' }
      ],
      permits: 'Rewires, remodels, and additions are permitted with both rough and final inspections. In historic districts — Winter Park and parts of downtown Orlando especially — there can be additional review. We plan for it.',
      proofTag: 'Rewire'
    },
    {
      slug: 'electrical-repair',
      nav: 'Repair & troubleshooting',
      h1: 'Electrical repair & troubleshooting',
      eyebrow: 'DIAGNOSTIC $129 · APPLIED TO THE REPAIR',
      lede: 'Dead outlets, tripping breakers, flickering lights, hot switches. We find the cause, not the symptom — and we tell you what it costs before we fix it.',
      priceRange: 'Diagnostic $129',
      priceNote: 'The diagnostic fee is credited toward the repair when you approve the work. Most repairs are done in the same visit.',
      keywords: ['electrical repair orlando', 'electrician near me orlando', 'breaker keeps tripping', 'outlet not working orlando electrician'],
      signsTitle: 'What we get called for most',
      signs: [
        'Breaker that trips repeatedly, or will not reset',
        'Half the room lost power but the breaker looks fine',
        'Outlet or switch plate warm to the touch',
        'Lights that flicker or dim when the AC starts',
        'Buzzing at the panel, a switch, or a fixture',
        'GFCI that trips constantly, or one that will not trip at all'
      ],
      costTiers: [
        { label: 'Diagnostic visit', range: '$129', what: 'We find it and price the fix. Credited toward the repair if you approve.' },
        { label: 'Common same-visit repairs', range: '$180 – $450', what: 'Device replacement, bad connection, breaker, GFCI, junction repair.' },
        { label: 'Larger fault or circuit rebuild', range: '$450 – $1,500', what: 'Damaged run, buried splice, bootleg ground correction, circuit replacement.' }
      ],
      dayTitle: 'How a service call goes',
      day: [
        { time: 'Call', what: 'A human answers. If it sounds unsafe, we tell you what to shut off before we arrive.' },
        { time: 'Arrival', what: 'You get a name and a text before he pulls up.' },
        { time: 'Diagnosis', what: 'We trace the actual fault. No guessing, no parts cannon.' },
        { time: 'Price then fix', what: 'You hear the number before the work starts. Most repairs finish in the same visit.' }
      ],
      faqs: [
        { q: 'Why does my breaker keep tripping?', a: 'It is doing its job. Either the circuit is overloaded, or there is a short or ground fault. Repeated resetting without finding the cause is how fires start.' },
        { q: 'Is a warm outlet an emergency?', a: 'Treat it as one. Shut that breaker off and call. Warm devices mean a loose connection heating up inside the wall.' },
        { q: 'Do you charge for the estimate?', a: 'Estimates for planned work are free. Diagnostic troubleshooting is $129 because finding the fault is the work — and it is credited toward the repair.' },
        { q: 'Can you fix another electrician\'s work?', a: 'A good share of our repair calls are exactly that. We are not interested in trashing anyone, just in making it right.' },
        { q: 'Same-day service?', a: 'Often, and always same-day callback. Genuinely unsafe conditions get moved to the front.' },
        { q: 'What if it turns out to be nothing?', a: 'Then you pay the diagnostic and we tell you it is nothing. That happens, and we would rather say it than invent a repair.' }
      ],
      permits: 'Most like-for-like repairs do not require a permit. Replacing a circuit, adding capacity, or panel work does — and we file it rather than pretending otherwise.',
      proofTag: 'Repair'
    },
    {
      slug: 'commercial-electrician',
      nav: 'Commercial',
      h1: 'Commercial electrical contractor, Central Florida',
      eyebrow: 'BUILD-OUTS · 3-PHASE · MAINTENANCE ACCOUNTS',
      lede: 'Tenant improvements, restaurant and retail wiring, three-phase service, and maintenance accounts for property managers who are tired of chasing contractors.',
      priceRange: 'Bid in 48 hours',
      priceNote: 'Commercial work is bid per scope. What we can promise is a bid inside two business days and a schedule we actually hold.',
      keywords: ['commercial electrician orlando', 'restaurant electrical contractor orlando', 'tenant build out electrician', 'three phase electrician central florida'],
      signsTitle: 'What we take on',
      signs: [
        'Tenant build-outs and white-box finishes',
        'Restaurant kitchens: hood circuits, walk-ins, line equipment',
        'Retail lighting, signage, and dedicated POS circuits',
        'Three-phase service, panels, and disconnects',
        'Property management maintenance accounts and after-hours response',
        'Code corrections for inspections and change of use'
      ],
      costTiers: [
        { label: 'Service & maintenance account', range: 'Rate card', what: 'Priority scheduling, standard hourly, one point of contact for multiple properties.' },
        { label: 'Tenant improvement', range: 'Per scope', what: 'Plans reviewed, permit filed, coordinated with GC and inspector.' },
        { label: 'Restaurant or heavy equipment', range: 'Per scope', what: 'Load study, three-phase where needed, equipment schedule verified before rough-in.' }
      ],
      dayTitle: 'How we run a commercial job',
      day: [
        { time: 'Walk', what: 'Site visit with your plans or your equipment list. We ask the questions that prevent change orders.' },
        { time: '48 hours', what: 'Bid delivered, itemized, with what is excluded stated plainly.' },
        { time: 'Permit', what: 'Filed and tracked by our office. We attend inspections.' },
        { time: 'Build', what: 'Sequenced with the other trades. You get one contact who answers the phone.' },
        { time: 'Close', what: 'As-builts, panel schedules, and a final walk with your punch list.' }
      ],
      faqs: [
        { q: 'Do you work with general contractors?', a: 'Regularly. We show up when the schedule says and we do not hold up the other trades.' },
        { q: 'After-hours work?', a: 'Yes — retail and restaurant work often has to happen after close. We schedule it that way.' },
        { q: 'Can you handle multiple properties?', a: 'That is what our maintenance accounts are for. One contact, priority response, consistent rates.' },
        { q: 'Are you licensed and insured for commercial?', a: 'Licensed, insured, and workers-comp covered. We provide certificates before we start.' },
        { q: 'How fast is a bid?', a: 'Two business days for most scopes. If it will take longer we tell you why on day one.' },
        { q: 'Change of use or code corrections?', a: 'Common work for us. We read the inspector\'s list and price the corrections line by line.' }
      ],
      permits: 'Commercial permitting is heavier: plan review, sometimes engineered drawings, and staged inspections. Our office handles filing and tracking, and we attend inspections so questions get answered on the spot.',
      proofTag: 'Commercial'
    },
    {
      slug: 'emergency-electrician',
      nav: 'Emergency',
      h1: 'Emergency electrician, Orlando & Central Florida',
      eyebrow: 'CALL, DO NOT SUBMIT A FORM',
      lede: 'Burning smell, sparking panel, hot outlet, power loss to part of the house. Shut the breaker off if you can reach it safely, then call.',
      priceRange: 'Call for dispatch',
      priceNote: 'Emergency response is priced by time and severity. What we will not do is quote a fear number over the phone before anyone has looked at it.',
      keywords: ['emergency electrician orlando', '24 hour electrician near me', 'sparking outlet who to call', 'electrical emergency orlando'],
      signsTitle: 'Call immediately if',
      signs: [
        'You smell burning plastic anywhere near a device or panel',
        'A panel, breaker, outlet, or switch is hot to the touch',
        'You see sparks, arcing, or scorch marks',
        'Water has reached your panel or outlets',
        'A breaker will not reset, or resets and immediately trips',
        'Someone got shocked by an appliance, switch, or fixture'
      ],
      costTiers: [
        { label: 'What to do first', range: 'Free', what: 'Shut off the affected breaker if you can reach it safely. If the panel itself is involved, do not touch it — call.' },
        { label: 'Emergency dispatch', range: 'By severity', what: 'Genuinely unsafe conditions go to the front of the schedule, ahead of quoted work.' },
        { label: 'After-hours response', range: 'By severity', what: 'Same number after hours. A human or a callback, not a call center script.' }
      ],
      dayTitle: 'What happens when you call',
      day: [
        { time: 'Immediately', what: 'We triage on the phone: is this safe to wait, or does something need to be off right now?' },
        { time: 'Next', what: 'If it is unsafe, you get moved ahead of quoted work. That is a standing rule.' },
        { time: 'On site', what: 'Make it safe first, diagnose second, then price the repair before doing it.' },
        { time: 'After', what: 'If it needs permitted follow-up work, we schedule it and file the permit.' }
      ],
      faqs: [
        { q: 'Are you 24 hours?', a: 'We have an after-hours emergency line at the same number. Regular hours are Monday to Friday, 8 to 6.' },
        { q: 'Is a burning smell always an emergency?', a: 'Yes. Burning plastic means something is overheating inside a wall or a device. Shut that breaker off and call.' },
        { q: 'Should I keep resetting the breaker?', a: 'No. It is tripping for a reason. Repeated resets on a fault are exactly how a fault becomes a fire.' },
        { q: 'What if it is a utility problem?', a: 'We will tell you, and we will not charge you for a repair that belongs to OUC, Duke, or KUA. Sometimes the honest answer is "call the utility."' },
        { q: 'Power out in half the house?', a: 'Often a lost neutral or a failed main lug — worth calling rather than waiting, because a lost neutral can damage appliances.' },
        { q: 'Do you charge more after hours?', a: 'Yes, and we tell you the rate before we dispatch.' }
      ],
      permits: 'Making a condition safe comes first; permits follow for any repair that requires them. Anyone who tells you emergency work never needs a permit is telling you something else about how they operate.',
      proofTag: 'Repair'
    }
  ];

  var CITIES = [
    {
      slug: 'orlando-electrician', name: 'Orlando', county: 'Orange County', reviews: 312, verify: true,
      utility: 'OUC (Orlando Utilities Commission) in the city core; Duke Energy in outlying areas',
      permitOffice: 'City of Orlando Permitting Services, or Orange County Building Safety outside city limits',
      drive: 'Our shop is here — 500 N Hudson Street.',
      neighborhoods: ['College Park', 'Baldwin Park', 'Delaney Park', 'Audubon Park', 'Dr. Phillips', 'Lake Nona', 'Conway', 'Thornton Park'],
      housingStock: [
        'College Park and Delaney Park: 1920s–40s bungalows, cloth wiring and 60–100A services still in service',
        'Conway and Pine Hills: 1960s–70s ranches, aluminum branch wiring and Federal Pacific panels',
        'Baldwin Park and Lake Nona: newer construction, mostly capacity questions for EV chargers and pool equipment',
        'Downtown condos and lofts: panel access and building coordination matter more than the wiring itself'
      ],
      localNotes: 'Orlando is two electrical cities. Inside the older ring, the work is remediation — panels, grounding, cloth and aluminum wiring in houses that were wired before air conditioning was standard. Out toward Lake Nona and Horizon West it is capacity: adding a charger, a pool heater, or a second AC to a house that was built to the minimum.',
      crew: 'Grant and Victor cover most of the city core.'
    },
    {
      slug: 'winter-park-electrician', name: 'Winter Park', county: 'Orange County', reviews: 88, verify: true,
      utility: 'City of Winter Park owns and operates its own electric utility — one of the few in Central Florida',
      permitOffice: 'City of Winter Park Building & Permitting Services',
      drive: 'Eight minutes from Park Avenue.',
      neighborhoods: ['Park Avenue district', 'Winter Park Racquet Club', 'Windsong', 'Orwin Manor', 'Golfview', 'Lake Sue'],
      housingStock: [
        'Historic district: 1920s–40s homes with cloth wiring, knob-and-tube remnants, and no grounding',
        '60-amp and 100-amp services that were adequate for two window units and are not adequate now',
        'Plaster-and-lath walls, which changes how a rewire is staged and patched',
        'Newer infill and rebuilds along the lakes: high-end fixture, landscape and dock lighting work'
      ],
      localNotes: 'Winter Park owns its utility, which means service coordination goes through the city rather than OUC or Duke — a difference that surprises electricians who do not work here often. Add the historic district and you get a place where the wrong approach costs a homeowner weeks. We know what is behind the walls of a 1940s bungalow here because we have opened a lot of them.',
      crew: 'Mike is in Winter Park most Tuesdays.'
    },
    {
      slug: 'kissimmee-electrician', name: 'Kissimmee', county: 'Osceola County', reviews: 44, verify: true,
      utility: 'KUA (Kissimmee Utility Authority) in the city; Duke Energy in parts of the county',
      permitOffice: 'City of Kissimmee Building Department, or Osceola County outside city limits',
      drive: 'Trucks out daily down 192 and Orange Blossom Trail.',
      neighborhoods: ['Downtown Kissimmee', 'Buenaventura Lakes', 'Poinciana', 'Celebration', 'Campbell City', 'Kissimmee Bay'],
      housingStock: [
        '1970s–80s subdivisions with original 100A panels and aluminum branch wiring',
        'Heavy short-term-rental stock: pool equipment, spa circuits, and constant GFCI service calls',
        'Manufactured and mobile home services, which have their own service and bonding rules',
        'Celebration: 1990s construction, mostly panel capacity and generator interest'
      ],
      localNotes: 'Kissimmee has more vacation-rental electrical work than anywhere else we serve — pool and spa bonding, exterior GFCI, and equipment that runs harder than a family home ever would. It also has KUA as the utility inside the city, which changes who releases the meter on a service upgrade.',
      crew: 'Keylin and William run most of the Osceola work.'
    },
    {
      slug: 'maitland-electrician', name: 'Maitland', county: 'Orange County', reviews: 41, verify: true,
      utility: 'Duke Energy across most of Maitland',
      permitOffice: 'City of Maitland Building Department',
      drive: 'Ten minutes from the shop.',
      neighborhoods: ['Dommerich', 'Maitland Isle', 'Lake Catherine', 'Druid Hills', 'Maitland Center'],
      housingStock: [
        '1950s–60s ranches around the lakes: 100A services, ungrounded branch circuits',
        'Mid-century homes with original panels that have been added to repeatedly',
        'Maitland Center office park: commercial tenant improvement and lighting retrofits',
        'Lakefront properties: dock lighting, boat lift circuits, and bonding done properly'
      ],
      localNotes: 'Maitland is lake homes and mid-century ranches, which means two kinds of calls: capacity for houses that have been renovated three times on an original panel, and waterfront work where bonding and GFCI protection are not optional. Dock and boat lift circuits done wrong are one of the genuinely dangerous things we find.',
      crew: 'Victor covers Maitland and Eatonville.'
    },
    {
      slug: 'longwood-electrician', name: 'Longwood', county: 'Seminole County', reviews: 36, verify: true,
      utility: 'Duke Energy across most of Longwood',
      permitOffice: 'City of Longwood Building Division, or Seminole County outside city limits',
      drive: 'Twenty minutes up 17-92.',
      neighborhoods: ['Historic Longwood', 'Sweetwater Oaks', 'Wekiva', 'Springs', 'Alaqua'],
      housingStock: [
        'Historic Longwood: some of the oldest housing stock in Seminole County, with wiring to match',
        'Sweetwater and Wekiva: 1970s–80s homes, Federal Pacific and Zinsco panels are common finds',
        'Well pumps and septic systems — dedicated circuits and surge protection matter more here',
        'Larger lots meaning long exterior runs for gates, wells, sheds, and pools'
      ],
      localNotes: 'Longwood has an unusual concentration of 1970s panels we consider replacement candidates on sight, and enough well-and-septic properties that surge protection is a practical conversation rather than an upsell — losing a well pump to a nearby strike means no water, not just an inconvenience.',
      crew: 'Grant and Jason cover Seminole County.'
    },
    {
      slug: 'lake-mary-electrician', name: 'Lake Mary', county: 'Seminole County', reviews: 29, verify: true,
      utility: 'Duke Energy across Lake Mary',
      permitOffice: 'City of Lake Mary Building Department',
      drive: 'Twenty-five minutes up I-4.',
      neighborhoods: ['Heathrow', 'Timacuan', 'Lake Mary Woods', 'Greenwood Lakes', 'Colonial TownPark'],
      housingStock: [
        '1990s–2000s construction: sound wiring, but panels sized to the minimum of their day',
        'The highest EV adoption in our service area — charger installs are our most common Lake Mary call',
        'Two-story homes with attic runs, which is where charger routing gets decided',
        'Colonial TownPark and the 17-92 corridor: commercial tenant and office work'
      ],
      localNotes: 'Lake Mary sends us more EV charger calls than any other city we serve, and the pattern repeats: a 2001 house with a 150A panel, a new EV, and an installer who wants to sell a service upgrade. A load calculation answers it honestly, and more often than not the upgrade is unnecessary.',
      crew: 'Jason handles most Lake Mary EV work.'
    },
    {
      slug: 'winter-garden-electrician', name: 'Winter Garden', county: 'Orange County', reviews: 27, verify: true,
      utility: 'Duke Energy and OUC both serve parts of west Orange County',
      permitOffice: 'City of Winter Garden Building Department, or Orange County for unincorporated areas',
      drive: 'Trucks out west daily on the 429.',
      neighborhoods: ['Downtown Winter Garden', 'Oakland', 'Horizon West', 'Independence', 'Winter Garden Historic District'],
      housingStock: [
        'Historic downtown: early-century homes with cloth wiring and undersized services',
        'Horizon West and Independence: new construction, so capacity and smart-device work dominate',
        'Rapid growth means a lot of additions and garage conversions on existing services',
        'Downtown commercial: restaurant and retail build-outs along Plant Street'
      ],
      localNotes: 'Winter Garden is the sharpest split in our service area — a genuinely historic downtown next to some of the newest subdivisions in Florida. Utility territory is also mixed out here between Duke and OUC, which decides who we coordinate with on a service change, so it is worth confirming your address before scheduling.',
      crew: 'William covers west Orange.'
    },
    {
      slug: 'oviedo-electrician', name: 'Oviedo', county: 'Seminole County', reviews: 22, verify: true,
      utility: 'Duke Energy across most of Oviedo',
      permitOffice: 'City of Oviedo Building Division, or Seminole County outside city limits',
      drive: 'Half an hour east.',
      neighborhoods: ['Alafaya Woods', 'Twin Rivers', 'Kingsbridge', 'Live Oak Reserve', 'Downtown Oviedo'],
      housingStock: [
        '1980s–90s subdivisions: original panels now at capacity after two renovations',
        'Pool homes in volume, which means pump circuits, heater loads, and bonding',
        'Larger wooded lots with long service runs and outbuildings',
        'Proximity to UCF: rental properties with deferred electrical maintenance'
      ],
      localNotes: 'Oviedo is pool country, and pool equipment is where we find the most code problems — unbonded pumps, heaters added on undersized circuits, and GFCI protection that was never there. It is also where we get called after a DIY renovation, which is a specialty of ours whether we like it or not.',
      crew: 'Victor and Keylin cover east Seminole.'
    },
    {
      slug: 'st-cloud-electrician', name: 'St. Cloud', county: 'Osceola County', reviews: 19, verify: true,
      utility: 'St. Cloud is served through OUC under a long-standing arrangement; Duke Energy serves parts of the county',
      permitOffice: 'City of St. Cloud Building Department, or Osceola County outside city limits',
      drive: 'Forty minutes southeast.',
      neighborhoods: ['Downtown St. Cloud', 'Anthem Park', 'Canoe Creek', 'Narcoossee', 'Twin Lakes'],
      housingStock: [
        'Older downtown homes with original services and minimal grounding',
        'New subdivisions south and east, growing fast, built to minimum capacity',
        'Rural properties with wells, barns, and long exterior feeder runs',
        'Manufactured homes, which have distinct service and bonding requirements'
      ],
      localNotes: 'St. Cloud runs from century-old downtown houses to subdivisions finished last year, with a lot of rural property in between — wells, outbuildings, and long feeder runs where voltage drop is a real calculation rather than an afterthought. Utility arrangements out here are worth confirming per address before a service change.',
      crew: 'Keylin covers south Osceola.'
    },
    {
      slug: 'apopka-electrician', name: 'Apopka', county: 'Orange County', reviews: 18, verify: true,
      utility: 'Duke Energy across most of Apopka',
      permitOffice: 'City of Apopka Building Department, or Orange County outside city limits',
      drive: 'Half an hour northwest.',
      neighborhoods: ['Errol Estates', 'Rock Springs', 'Wekiwa Springs', 'Sweetwater West', 'Downtown Apopka'],
      housingStock: [
        '1970s–80s homes with original panels, many of them replacement candidates',
        'Agricultural and nursery properties: three-phase, irrigation, and outbuilding circuits',
        'Well pumps in volume — surge protection is a practical necessity here',
        'Newer growth along 429 and 441 with standard capacity questions'
      ],
      localNotes: 'Apopka still has real agricultural and nursery work — three-phase service, irrigation pumps, and outbuildings that were wired by whoever was available at the time. Combine that with wells across most of the older housing stock and surge protection stops being a product and becomes the difference between a storm and a week without water.',
      crew: 'William and Josh cover northwest Orange.'
    },
    {
      slug: 'sanford-electrician', name: 'Sanford', county: 'Seminole County', reviews: 16, verify: true,
      utility: 'FPL (Florida Power & Light) serves Sanford',
      permitOffice: 'City of Sanford Building Division, or Seminole County outside city limits',
      drive: 'Thirty-five minutes north.',
      neighborhoods: ['Historic Sanford', 'Downtown Sanford', 'Lake Forest', 'Riverside', 'Midway'],
      housingStock: [
        'Historic district: some of the oldest housing in the region, with knob-and-tube still turning up',
        'Downtown commercial buildings in ongoing renovation — change-of-use electrical work',
        'Post-war bungalows with 60A services and no grounding',
        'Lakefront and riverfront properties with dock and lift circuits'
      ],
      localNotes: 'Sanford has the oldest housing stock we regularly work in, and it is on FPL rather than Duke or OUC — a different utility process for service changes than the rest of Seminole County. The downtown renovation wave also means a steady stream of change-of-use work where an inspector\'s correction list is the starting point.',
      crew: 'Grant handles Sanford and north Seminole.'
    },
    {
      slug: 'windermere-electrician', name: 'Windermere', county: 'Orange County', reviews: 14, verify: true,
      utility: 'Duke Energy serves most of the Windermere area',
      permitOffice: 'Town of Windermere, or Orange County for surrounding unincorporated areas',
      drive: 'Twenty-five minutes southwest.',
      neighborhoods: ['Town of Windermere', 'Isleworth', 'Keene\'s Pointe', 'Casa del Lago', 'Butler Bay'],
      housingStock: [
        'Large custom homes with multiple panels, subpanels, and complex load profiles',
        'Butler Chain lakefront: dock lighting, boat lifts, and bonding done to standard',
        'Landscape lighting at real scale — transformers, zones, and controls',
        'Standby generators, whole-home surge protection, and multiple EV chargers'
      ],
      localNotes: 'Windermere work is bigger and more particular: multiple subpanels, generator systems, landscape lighting at genuine scale, and lakefront bonding that has to be right. It is also where finish quality gets inspected closely — which suits us, because neat is what our reviews keep saying.',
      crew: 'Grant and Josh handle Windermere and Dr. Phillips.'
    }
  ];

  /* Tier 4 — only where search volume and real local difference justify a page. */
  var MATRIX = [
    {
      slug: 'panel-upgrade-winter-park', service: 'electrical-panel-upgrade', city: 'winter-park-electrician',
      h1: 'Electrical panel upgrades in Winter Park, FL',
      lede: 'Winter Park owns its own electric utility, so a service upgrade here follows a different process than Orlando or Seminole County. We do it often enough to know the sequence.',
      localDetail: [
        { t: 'The utility is the city', d: 'Winter Park runs its own electric utility, so meter release and reconnection go through the city rather than OUC or Duke. It is usually a smoother process than the big utilities — but only if the paperwork is filed the way the city expects.' },
        { t: 'Historic district review', d: 'If your home is in the historic district, exterior changes — a relocated meter, a new mast — can trigger additional review. We flag it at the estimate rather than discovering it mid-job.' },
        { t: 'What is behind these walls', d: '1920s–40s bungalows here commonly have cloth wiring, no grounding, and a 60 or 100-amp service. A panel swap alone sometimes is not the honest answer, and we will say so.' },
        { t: 'Plaster, not drywall', d: 'Plaster-and-lath changes how we open and close walls. Our patching accounts for it — we are not leaving you with a hole and a business card.' }
      ],
      keywords: ['panel upgrade winter park', 'electrical panel replacement winter park fl', '200 amp service upgrade winter park']
    },
    {
      slug: 'ev-charger-lake-mary', service: 'ev-charger-installation', city: 'lake-mary-electrician',
      h1: 'EV charger installation in Lake Mary, FL',
      lede: 'Lake Mary sends us more charger installs than any city we serve, and the same conversation happens most weeks: you probably do not need the service upgrade someone quoted you.',
      localDetail: [
        { t: 'The 1990s–2000s panel question', d: 'Most Lake Mary homes were built with a 150 or 200-amp panel sized to the code minimum of the time. That is usually enough for a charger — a load calculation proves it either way, and it is free.' },
        { t: 'Load management instead of an upgrade', d: 'When capacity is genuinely tight, a load-sharing device is often a few hundred dollars against a few thousand for a service upgrade. We lead with the cheaper answer.' },
        { t: 'Two-story attic routing', d: 'Heathrow and Timacuan homes usually route cleanest through the attic. Where the garage sits relative to the panel is what sets your price.' },
        { t: 'Duke Energy territory', d: 'Lake Mary is Duke, so if a service change is genuinely needed, we coordinate the disconnect with them and schedule around their window rather than promising you a date we do not control.' }
      ],
      keywords: ['ev charger installation lake mary', 'tesla charger installer lake mary fl', 'level 2 charger lake mary']
    },
    {
      slug: 'panel-upgrade-orlando', service: 'electrical-panel-upgrade', city: 'orlando-electrician',
      h1: 'Electrical panel upgrades in Orlando, FL',
      lede: 'Our shop is on Hudson Street, so Orlando is the address we drive to most. Two very different jobs live under one city name here.',
      localDetail: [
        { t: 'OUC or Duke — it decides your schedule', d: 'Inside the city core you are on OUC; further out it is Duke. They release and reconnect meters on different timelines, and that — not the permit — is what sets your date. We tell you which one you are on at the estimate.' },
        { t: 'The older ring is remediation work', d: 'College Park, Delaney Park and Conway were wired before central air was standard. A panel swap is often only half the honest answer; sometimes the grounding electrode system is the real problem.' },
        { t: 'Lake Nona and the south end is capacity', d: 'Newer houses built to the code minimum of their year, now absorbing a charger, a pool heater and a second AC. A load calculation usually settles it without a service upgrade.' },
        { t: 'City vs. county permitting', d: 'City of Orlando Permitting Services inside the limits, Orange County Building Safety outside. Same job, different queue — our office files to the right one so it does not sit for a week.' }
      ],
      keywords: ['electrical panel upgrade orlando', '200 amp panel orlando cost', 'breaker box replacement orlando']
    },
    {
      slug: 'panel-upgrade-lake-mary', service: 'electrical-panel-upgrade', city: 'lake-mary-electrician',
      h1: 'Electrical panel upgrades in Lake Mary, FL',
      lede: 'Most Lake Mary panels are not old — they are just full. That is a different conversation than a replacement, and a cheaper one.',
      localDetail: [
        { t: 'Full is not the same as failing', d: 'Heathrow and Timacuan homes typically have a sound 150 or 200-amp panel with every slot doubled up. Often a subpanel or tandem correction solves it for a fraction of a service upgrade.' },
        { t: 'When it genuinely is the panel', d: 'Some late-90s builds used panels with known breaker availability problems. We will show you what is in yours and what parts still exist for it.' },
        { t: 'Duke Energy coordination', d: 'Lake Mary is Duke territory. If the meter has to come off, we schedule around their window rather than promising you a date we do not control.' },
        { t: 'City of Lake Mary permitting', d: 'Filed by our office, inspection met by us. You do not take a day off work for it — customers thank Janzie by name for exactly this.' }
      ],
      keywords: ['panel upgrade lake mary', 'electrical panel replacement lake mary fl', 'subpanel install lake mary']
    },
    {
      slug: 'panel-upgrade-kissimmee', service: 'electrical-panel-upgrade', city: 'kissimmee-electrician',
      h1: 'Electrical panel upgrades in Kissimmee, FL',
      lede: 'Kissimmee panels work harder than most. Vacation rentals and pool equipment run loads a family home never sees, and 1970s panels were not built for it.',
      localDetail: [
        { t: 'KUA inside the city, Duke outside', d: 'Kissimmee Utility Authority serves the city; parts of Osceola County are Duke. Which one you are on decides who releases your meter, and it is worth confirming before you book a date.' },
        { t: 'Rental properties change the priority', d: 'A panel failure in a short-term rental means cancelled bookings and a review you cannot delete. We schedule rental work around turnover days when we can.' },
        { t: 'Pool and spa load is the usual cause', d: 'Heater, pump and spa added over years to an original 100-amp service. The load calculation usually explains every nuisance trip the owner has been living with.' },
        { t: 'Manufactured homes are their own rules', d: 'Service and bonding requirements differ from stick-built, and a lot of Osceola stock is manufactured. We do these regularly — many electricians will not touch them.' }
      ],
      keywords: ['panel upgrade kissimmee', 'electrical panel replacement kissimmee fl', 'breaker box kissimmee']
    },
    {
      slug: 'panel-upgrade-windermere', service: 'electrical-panel-upgrade', city: 'windermere-electrician',
      h1: 'Electrical panel upgrades in Windermere, FL',
      lede: 'Windermere services are bigger and more particular — multiple panels, subpanels feeding docks and guest houses, and finish work that gets looked at closely.',
      localDetail: [
        { t: 'It is rarely just one panel', d: 'Isleworth and Keene\'s Pointe homes commonly run a main plus two or three subpanels for the pool, dock and casita. Upgrading one without mapping the others is how you end up back a year later.' },
        { t: 'Lakefront bonding gets inspected', d: 'Anything feeding a dock or lift has bonding requirements that are genuinely dangerous to get wrong. We correct what we find, and we document it.' },
        { t: 'Generator and EV load in the same plan', d: 'Most Windermere panel work here is really load planning: standby generator, two chargers, pool equipment. Better to size once than upgrade twice.' },
        { t: 'Town of Windermere vs. Orange County', d: 'The Town permits inside its limits; surrounding addresses go through Orange County. HOA review is also real out here and we flag it before the estimate, not after.' }
      ],
      keywords: ['panel upgrade windermere', 'electrical panel windermere fl', 'subpanel dock windermere']
    },
    {
      slug: 'panel-upgrade-oviedo', service: 'electrical-panel-upgrade', city: 'oviedo-electrician',
      h1: 'Electrical panel upgrades in Oviedo, FL',
      lede: 'Oviedo is pool country on 1980s and 90s services. Those two facts together explain most of the panel calls we take here.',
      localDetail: [
        { t: 'Pool equipment is usually the tipping point', d: 'Alafaya Woods and Twin Rivers homes were wired before variable-speed pumps and heaters. Add a spa and the original panel is out of room and out of margin.' },
        { t: 'What we find behind the cover', d: '1980s panels here often have double-tapped breakers from a previous owner\'s additions. Sometimes correcting that is the whole fix and no upgrade is needed.' },
        { t: 'Long runs on wooded lots', d: 'Bigger lots mean the meter can sit a long way from the panel. Wire size and voltage drop become real calculations, not afterthoughts.' },
        { t: 'City of Oviedo or Seminole County', d: 'Inside the city it is Oviedo Building Division; outside it is Seminole County. Duke releases the meter either way. Our office handles both.' }
      ],
      keywords: ['panel upgrade oviedo', 'electrical panel replacement oviedo fl', 'pool panel upgrade oviedo']
    },
    {
      slug: 'ev-charger-orlando', service: 'ev-charger-installation', city: 'orlando-electrician',
      h1: 'EV charger installation in Orlando, FL',
      lede: 'Orlando charger installs split cleanly: older homes need a capacity conversation, newer ones just need a clean run. Either way the load calculation comes first.',
      localDetail: [
        { t: 'Older core homes: check before you buy', d: 'College Park and Audubon Park houses on 100-amp services may genuinely need capacity work. We would rather tell you that before you order a charger than after.' },
        { t: 'Newer south-end homes: usually fine', d: 'Lake Nona and Baldwin Park panels almost always have room. Most of these are half-day installs and the price is decided by run length, nothing else.' },
        { t: 'Condos and townhomes need the HOA first', d: 'Downtown and Thornton Park attached housing means shared panels and association approval. We will tell you what to ask them so you only ask once.' },
        { t: 'OUC vs. Duke on incentives', d: 'Which utility you are on can change what rebates apply. Ask us what is current when you call — it moves year to year and we track it because customers ask.' }
      ],
      keywords: ['ev charger installation orlando', 'tesla charger installer orlando', 'level 2 charger orlando cost']
    },
    {
      slug: 'ev-charger-winter-park', service: 'ev-charger-installation', city: 'winter-park-electrician',
      h1: 'EV charger installation in Winter Park, FL',
      lede: 'Winter Park charger installs are as much a carpentry problem as an electrical one — 1940s houses with plaster walls and detached garages.',
      localDetail: [
        { t: 'The garage is often not attached', d: 'Detached garages here mean a buried or overhead feeder, sometimes a small subpanel. That is the single biggest price factor and we measure it rather than estimate it.' },
        { t: 'Plaster walls change the run', d: 'Plaster-and-lath does not open and close like drywall. We plan surface conduit where it will look deliberate instead of cutting a wall we cannot invisibly patch.' },
        { t: 'The city is your utility', d: 'Winter Park owns its electric utility, so any service work coordinates through the city — usually smoother than the big utilities, but only if filed the way they expect.' },
        { t: 'Historic district exterior review', d: 'Visible exterior conduit or a relocated meter can trigger review. We flag it at the estimate so nothing stalls mid-job.' }
      ],
      keywords: ['ev charger installation winter park', 'tesla charger winter park fl', 'detached garage ev charger']
    },
    {
      slug: 'ev-charger-kissimmee', service: 'ev-charger-installation', city: 'kissimmee-electrician',
      h1: 'EV charger installation in Kissimmee, FL',
      lede: 'Kissimmee has two charger customers: homeowners, and rental owners who have realised guests now filter listings by whether there is a charger.',
      localDetail: [
        { t: 'Rentals need metering and limits', d: 'A guest-accessible charger on your electric bill is a problem unless it is managed. We install units with usage limits and scheduling so it does not become an unmetered giveaway.' },
        { t: 'KUA or Duke decides the paperwork', d: 'City addresses are Kissimmee Utility Authority; county addresses are often Duke. It matters if the install needs any service change.' },
        { t: 'Existing pool load is already there', d: 'Many Osceola homes already run a pool heater and pump on an original service. The load calculation has to account for that before anyone promises you a 48-amp charger.' },
        { t: 'Celebration and HOA neighborhoods', d: 'Exterior equipment approval is real in Celebration and the newer communities. We tell you what to submit before we schedule.' }
      ],
      keywords: ['ev charger installation kissimmee', 'vacation rental ev charger florida', 'tesla charger kissimmee fl']
    },
    {
      slug: 'ev-charger-windermere', service: 'ev-charger-installation', city: 'windermere-electrician',
      h1: 'EV charger installation in Windermere, FL',
      lede: 'Two and three chargers per household is normal here. That is a load management question, not just an install.',
      localDetail: [
        { t: 'Multiple chargers, one service', d: 'Three cars does not mean three service upgrades. Load-sharing lets chargers negotiate available capacity between them — a few hundred dollars against several thousand.' },
        { t: 'Long runs and detached structures', d: 'Motor courts, guest houses and porte-cocheres mean genuinely long feeders. Wire sizing for voltage drop is the difference between a charger that works and one that trickles.' },
        { t: 'Finish quality is the deliverable', d: 'Conduit here has to look intentional. Straight runs, evenly spaced straps, penetrations sealed properly — our reviews say "neat" more than they say "cheap."' },
        { t: 'HOA and Town review', d: 'Isleworth and Keene\'s Pointe both have architectural review for visible exterior work. We plan placement with that in mind up front.' }
      ],
      keywords: ['ev charger installation windermere', 'multiple ev chargers load sharing', 'tesla charger windermere fl']
    },
    {
      slug: 'ev-charger-oviedo', service: 'ev-charger-installation', city: 'oviedo-electrician',
      h1: 'EV charger installation in Oviedo, FL',
      lede: 'Oviedo garages are usually a straightforward run — the complication is what the pool equipment already took from your panel.',
      localDetail: [
        { t: 'The pool got there first', d: 'Pump, heater and sometimes a spa are already on your service. That is the number that decides whether a 48-amp charger is realistic or whether 32 amps is the smarter buy.' },
        { t: 'Two-story attic routing', d: 'Live Oak Reserve and Kingsbridge homes route cleanest through the attic. In Florida that means working early — we schedule attic work in the morning for a reason.' },
        { t: 'Load management beats an upgrade', d: 'When capacity is tight we lead with a load-sharing device. It is the cheaper honest answer and it is why people call us back.' },
        { t: 'Seminole County or City of Oviedo', d: 'Permit goes to whichever governs your address; Duke serves the area either way. Our office files it and meets the inspector.' }
      ],
      keywords: ['ev charger installation oviedo', 'tesla charger oviedo fl', 'ev charger pool home florida']
    },
    {
      slug: 'generator-orlando', service: 'generator-installation', city: 'orlando-electrician',
      h1: 'Standby generator installation in Orlando, FL',
      lede: 'Orlando siting is the hard part. Lot lines are tight, gas is not everywhere, and the pad has to clear windows, doors and the meter.',
      localDetail: [
        { t: 'Siting before sizing', d: 'On older Orlando lots the question is not what size — it is where it can legally and quietly go. We walk the clearances first, because a generator that cannot be sited is an academic quote.' },
        { t: 'Natural gas availability varies block to block', d: 'Some streets in the older ring have gas at the curb and the next street over does not. Where it does not, propane means a tank and its own setbacks.' },
        { t: 'Essential circuits usually wins here', d: 'For most Orlando homes, keeping AC, refrigeration and key outlets running costs far less than whole-home and covers what actually matters in an outage.' },
        { t: 'Two permits, one office visit', d: 'Generator installs typically need electrical plus gas permits. Our office files both and tracks them so you are not chasing two inspections.' }
      ],
      keywords: ['generator installation orlando', 'whole house generator orlando cost', 'standby generator orlando fl']
    },
    {
      slug: 'generator-winter-park', service: 'generator-installation', city: 'winter-park-electrician',
      h1: 'Standby generator installation in Winter Park, FL',
      lede: 'Winter Park is the most constrained generator work we do: small historic lots, close neighbors, and a city that reviews what you can see from the street.',
      localDetail: [
        { t: 'Noise and neighbors are the real constraint', d: 'Lots here are narrow and bedrooms are close. Siting for sound matters more than the decibel figure on the spec sheet, and we look at where everyone sleeps.' },
        { t: 'Historic district exterior review', d: 'Visible equipment can require review. We identify that at the estimate — discovering it after the permit is filed costs weeks.' },
        { t: 'The city is the utility', d: 'Winter Park runs its own electric utility, which changes coordination for the transfer switch tie-in compared with Duke or OUC territory.' },
        { t: 'Undergrounded service is a plus', d: 'Winter Park has undergrounded much of its distribution, so outages are less frequent than surrounding areas — worth weighing honestly before you spend five figures.' }
      ],
      keywords: ['generator installation winter park', 'standby generator winter park fl', 'generac installer winter park']
    },
    {
      slug: 'generator-lake-mary', service: 'generator-installation', city: 'lake-mary-electrician',
      h1: 'Standby generator installation in Lake Mary, FL',
      lede: 'Lake Mary generator work is usually clean: newer homes, gas often available, and panels modern enough to host the transfer equipment.',
      localDetail: [
        { t: 'Newer panels make this easier', d: '1990s and 2000s services generally accept a service-entrance transfer switch without reconfiguration. That saves real money against older-home installs.' },
        { t: 'Natural gas is common here', d: 'Much of Lake Mary and Heathrow has gas at the street, which means no tank, no refuelling and no siting fight over propane setbacks.' },
        { t: 'Combine it with the EV load', d: 'Half our Lake Mary generator customers also charge a car. Sizing both at once, once, is cheaper than discovering the conflict later.' },
        { t: 'HOA review in Heathrow and Timacuan', d: 'Architectural approval for exterior equipment is standard. We tell you what to submit and where the pad can go before you file.' }
      ],
      keywords: ['generator installation lake mary', 'standby generator lake mary fl', 'whole house generator seminole county']
    },
    {
      slug: 'generator-windermere', service: 'generator-installation', city: 'windermere-electrician',
      h1: 'Standby generator installation in Windermere, FL',
      lede: 'Large Windermere homes with multiple AC systems need real load engineering, not a chart. Whole-home here often means 24kW and up.',
      localDetail: [
        { t: 'Multiple AC systems drive the size', d: 'Two or three condensers plus pool equipment is a genuinely large starting load. We calculate it rather than round up, because rounding up costs thousands.' },
        { t: 'Multiple panels to transfer', d: 'Where a house runs a main plus subpanels for the dock and guest house, the transfer scheme matters as much as the generator. We map it before quoting.' },
        { t: 'Siting on the water side', d: 'Butler Chain properties have setbacks and grade to work with, and equipment near water needs corrosion consideration in its placement.' },
        { t: 'Book well before June', d: 'Lead times on larger units and the permit queue both stretch in hurricane season. The right time to do this is the boring part of the year.' }
      ],
      keywords: ['generator installation windermere', 'whole house generator windermere fl', '24kw generator orlando']
    },
    {
      slug: 'generator-oviedo', service: 'generator-installation', city: 'oviedo-electrician',
      h1: 'Standby generator installation in Oviedo, FL',
      lede: 'Oviedo outages come with the trees. Wooded lots are the appeal and also the reason the power goes out here more than in open subdivisions.',
      localDetail: [
        { t: 'Trees are why you are calling', d: 'Mature canopy over distribution lines means Oviedo loses power in storms that barely affect newer open developments. That is a real justification, not a sales line.' },
        { t: 'Propane is common on larger lots', d: 'Where gas does not run, tank siting has to clear the house, the pad and the property line. We plan it before the permit, not after.' },
        { t: 'Pool and well change the essentials list', d: 'If you are on a well, water stops when power does. That usually moves the well pump to the top of the essential-circuits list ahead of comfort loads.' },
        { t: 'Duke territory, two possible permit offices', d: 'City of Oviedo or Seminole County depending on your address, with electrical and gas permits both in play. Our office runs all of it.' }
      ],
      keywords: ['generator installation oviedo', 'standby generator oviedo fl', 'well pump generator florida']
    },
    {
      slug: 'generator-kissimmee', service: 'generator-installation', city: 'kissimmee-electrician',
      h1: 'Standby generator installation in Kissimmee, FL',
      lede: 'Osceola County loses power in storm season, and vacation rentals lose bookings with it. Generator work here is as much a business decision as a comfort one.',
      localDetail: [
        { t: 'KUA inside the city', d: 'Kissimmee Utility Authority serves the city, Duke serves parts of the county. Which one you are on decides the coordination process for a generator tie-in and service work.' },
        { t: 'Vacation rentals change the math', d: 'A rental that loses power loses bookings and reviews. Essential-circuit systems that keep AC, refrigeration, and pool equipment running usually pay back faster here than whole-home systems.' },
        { t: 'Propane is common', d: 'Natural gas does not reach every Osceola address. Where it does not, we plan tank siting with the setbacks and HOA rules up front instead of after the permit.' },
        { t: 'Book before June', d: 'Everyone calls the same week a storm forms. Lead times and permit queues both stretch in hurricane season — the good time to do this is the boring part of the year.' }
      ],
      keywords: ['generator installation kissimmee', 'whole house generator osceola county', 'standby generator kissimmee fl']
    }
  ];

  function bySlug(list) {
    var m = {};
    list.forEach(function (x) { m[x.slug] = x; });
    return m;
  }

  window.InPhazeContent = {
    SERVICES: SERVICES,
    CITIES: CITIES,
    MATRIX: MATRIX,
    serviceMap: bySlug(SERVICES),
    cityMap: bySlug(CITIES),
    matrixMap: bySlug(MATRIX),
    param: function (fallback) {
      try {
        var p = new URLSearchParams(window.location.search).get('p');
        return p || fallback;
      } catch (e) { return fallback; }
    }
  };
})();
