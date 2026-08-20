export default function Home() {
  return <div style={{maxWidth:"1200px",margin:"0 auto",padding:"20px"}}>
    <nav style={{display:"flex",justifyContent:"space-between",marginBottom:"40px"}}>
      <h1>In Phaze Electric</h1>
      <ul style={{display:"flex",gap:"30px",listStyle:"none"}}>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <h1>Expert Electrical Services</h1>
    <p>Licensed, insured, 24/7 emergency response</p>
    <a href="/contact" style={{padding:"15px 40px",backgroundColor:"#007bff",color:"white",borderRadius:"5px",textDecoration:"none"}}>Get Free Estimate</a>
  </div>;
}
