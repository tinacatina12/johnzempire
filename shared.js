/* ============================================================
   JOHNZ EMPIRE — shared.js  (loaded by every page)
   Theme, cookie, popup, particles, navbar, btt, AI, AOS
============================================================ */

/* ── THEME TOGGLE ── */
(function(){
  const saved = localStorage.getItem('je_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const btn = document.getElementById('themeBtn');
  function updateIcon(){
    if(!btn) return;
    const t = document.documentElement.getAttribute('data-theme');
    btn.innerHTML = t === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
  if(btn){
    updateIcon();
    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('je_theme', next);
      updateIcon();
    });
  }
})();

/* ── COOKIE CONSENT ── */
function setCookie(v){
  localStorage.setItem('je_cookie', v);
  const bar = document.getElementById('ck-bar');
  if(bar) bar.classList.add('hide');
}
(function(){
  const bar = document.getElementById('ck-bar');
  if(!bar) return;
  if(localStorage.getItem('je_cookie')) bar.classList.add('hide');
})();

/* ── SOCIAL POPUP (60 seconds) ── */
function closePopup(){
  const pop = document.getElementById('soc-pop');
  if(pop) pop.classList.remove('show');
  sessionStorage.setItem('je_popup', '1');
}
(function(){
  const pop = document.getElementById('soc-pop');
  if(!pop) return;
  pop.addEventListener('click', function(e){ if(e.target === this) closePopup(); });
  if(!sessionStorage.getItem('je_popup')){
    setTimeout(() => { pop.classList.add('show'); }, 60000);
  }
})();

/* ── CANVAS PARTICLES ── */
(function(){
  const canvas = document.getElementById('pcanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let visible = true;
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  resize();
  addEventListener('resize', resize);
  class Particle{
    constructor(init){
      this.x = Math.random() * canvas.width;
      this.y = init ? Math.random() * canvas.height : canvas.height + 20;
      this.r = Math.random() * 3 + 1.5;
      this.speed = Math.random() * 1.2 + 0.4;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.wobble = Math.random() * Math.PI * 2;
      this.ws = Math.random() * 0.02 + 0.005;
    }
    update(){
      this.y -= this.speed;
      this.wobble += this.ws;
      this.x += Math.sin(this.wobble) * 0.35;
      if(this.y < -10) Object.assign(this, new Particle(false));
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      const dark = document.documentElement.getAttribute('data-theme') !== 'light';
      ctx.fillStyle = dark ? `rgba(255,138,0,${this.opacity})` : `rgba(11,61,145,${this.opacity * 0.6})`;
      ctx.fill();
    }
  }
  const particles = [];
  for(let i = 0; i < 35; i++) particles.push(new Particle(true));
  function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(visible) particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; });
})();

/* ── SPLASH SCREEN (home only) ── */
(function(){
  const splash = document.getElementById('splash');
  if(!splash) return;
  setTimeout(() => {
    splash.style.opacity = '0';
    setTimeout(() => { splash.style.display = 'none'; }, 1000);
  }, 1500);
})();

/* ── NAVBAR SCROLL ── */
(function(){
  const nav = document.querySelector('.navbar');
  if(!nav) return;
  function check(){ nav.classList.toggle('scrolled', scrollY > 55); }
  addEventListener('scroll', check, { passive: true });
  check();
})();

/* ── BACK TO TOP ── */
(function(){
  const btn = document.getElementById('bttBtn');
  if(!btn) return;
  addEventListener('scroll', () => btn.classList.toggle('show', scrollY > 400), { passive: true });
  btn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── AOS INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  if(typeof AOS !== 'undefined') AOS.init({ duration: 900, once: true, offset: 80 });
});

/* ── FOOTER YEAR ── */
(function(){
  const el = document.getElementById('footerYear');
  if(el) el.textContent = new Date().getFullYear();
})();

/* ── SMOOTH SCROLL (anchor links) ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const h = this.getAttribute('href');
      if(h === '#') return;
      const target = document.querySelector(h);
      if(!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      const nc = document.getElementById('navbarCollapse');
      if(nc && nc.classList.contains('show')){
        const bsc = bootstrap.Collapse.getInstance(nc);
        if(bsc) bsc.hide();
      }
    });
  });
});

/* ── AI ASSISTANT ── */
document.addEventListener('DOMContentLoaded', () => {
  const chat  = document.getElementById('aiChatBox');
  const input = document.getElementById('aiInput');
  const send  = document.getElementById('aiSend');
  if(!chat || !input || !send) return;

  const KEY = 'YOUR_ANTHROPIC_API_KEY_HERE';
  let history = [{ role:'assistant', content:'Hello! I\'m your AI assistant for Johnz Empire. Ask me anything about services, pricing, or how we can help your business grow.' }];

  function addMsg(text, isUser){
    const div = document.createElement('div');
    div.className = 'ai-msg ' + (isUser ? 'ai-user' : 'ai-bot');
    const p = document.createElement('p'); p.textContent = text;
    div.appendChild(p); chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }
  function addTyping(){
    const div = document.createElement('div');
    div.className = 'ai-msg ai-bot typing-dots'; div.id = 'aiTyping';
    for(let i=0;i<3;i++){ const s=document.createElement('span'); div.appendChild(s); }
    chat.appendChild(div); chat.scrollTop = chat.scrollHeight;
  }
  function fallback(m){
    const l = m.toLowerCase();
    if(l.includes('price')||l.includes('cost')||l.includes('how much'))
      return 'ICT Training from UGX 50k/session, websites from UGX 500k, graphic design from UGX 30k.';
    if(l.includes('service')||l.includes('offer'))
      return 'Services: ICT Training, Digital Marketing, Graphic Design, Blogging, IT Support, Web & App Dev.';
    if(l.includes('contact')||l.includes('phone')||l.includes('email'))
      return 'Call 0759 970 315 or email contact@johnzempire.com. Kanyanya, Gayaza Road, Kampala.';
    return 'Contact us at 0759 970 315 for more details about your specific project needs.';
  }
  async function getReply(m){
    history.push({ role:'user', content:m });
    if(KEY === 'YOUR_ANTHROPIC_API_KEY_HERE') return fallback(m);
    try{
      const res = await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json','x-api-key':KEY,'anthropic-version':'2023-06-01'},
        body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:400,
          system:'You are the helpful AI assistant for Johnz Empire, Wadda John\'s digital solutions company in Kampala, Uganda. Be concise and friendly.',
          messages:history})
      });
      const data = await res.json();
      const reply = data.content[0].text;
      history.push({ role:'assistant', content:reply });
      return reply;
    }catch(e){ return fallback(m); }
  }
  async function sendMessage(){
    const text = input.value.trim();
    if(!text) return;
    addMsg(text, true); input.value = '';
    addTyping();
    const reply = await getReply(text);
    document.getElementById('aiTyping')?.remove();
    addMsg(reply, false);
  }
  send.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e => { if(e.key === 'Enter') sendMessage(); });
});

/* ── HIRE FORM (mailto) ── */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('hireForm');
  const btn  = document.getElementById('hireSendBtn');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name    = (document.getElementById('hName')    ||{}).value || '';
    const email   = (document.getElementById('hEmail')   ||{}).value || '';
    const service = (document.getElementById('hService') ||{}).value || '';
    const budget  = (document.getElementById('hBudget')  ||{}).value || '';
    const details = (document.getElementById('hDetails') ||{}).value || '';
    const body = `Name: ${name}\nEmail: ${email}\nService: ${service}\nBudget: ${budget}\n\nDetails:\n${details}`;
    window.open(`mailto:contact@johnzempire.com?subject=Hire%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`, '_blank');
    if(btn){ btn.textContent = 'Inquiry Opened ✓'; btn.style.background = '#16a34a'; }
    setTimeout(() => {
      if(btn){ btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Inquiry'; btn.style.background = ''; }
      form.reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById('hireModal'));
      if(modal) modal.hide();
    }, 3000);
  });
});
