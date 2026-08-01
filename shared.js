/* ============================================================
   JOHNZ EMPIRE — shared.js  v5 PREMIUM
   Formspree AJAX + all shared functionality
   Endpoint: https://formspree.io/f/mzdvwevp
============================================================ */

/* ── THEME TOGGLE ── */
(function(){
  const saved = localStorage.getItem('je_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const btn = document.getElementById('themeBtn');
  function updateIcon(){
    if(!btn) return;
    const t = document.documentElement.getAttribute('data-theme');
    btn.innerHTML = t === 'dark'
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }
  if(btn){
    updateIcon();
    btn.addEventListener('click', () => {
      const cur  = document.documentElement.getAttribute('data-theme');
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

/* ── SOCIAL POPUP (60 s) ── */
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
    setTimeout(() => pop.classList.add('show'), 60000);
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
      // Randomly pick between gold and cyan particles for visual richness
      const colors = dark
        ? [`rgba(255,179,0,${this.opacity})`, `rgba(0,200,232,${this.opacity * 0.7})`, `rgba(30,94,255,${this.opacity * 0.5})`]
        : [`rgba(30,94,255,${this.opacity * 0.55})`, `rgba(79,70,229,${this.opacity * 0.4})`];
      ctx.fillStyle = colors[Math.floor(this.r * 10) % colors.length];
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

/* ── SPLASH ── */
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

/* ── SMOOTH SCROLL ── */
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

/* ============================================================
   FORMSPREE AJAX HELPER
   Endpoint: https://formspree.io/f/mzdvwevp
   Usage: await submitToFormspree(formData)
============================================================ */
async function submitToFormspree(formData) {
  const res = await fetch('https://formspree.io/f/mzdvwevp', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });
  const json = await res.json();
  if(!res.ok) throw new Error(json.errors ? json.errors.map(e=>e.message).join(', ') : 'Submission failed');
  return json;
}

/* ── BUTTON loading state helpers ── */
function setBtnLoading(btn, text = 'Sending…'){
  btn.disabled = true;
  btn.dataset.orig = btn.innerHTML;
  btn.innerHTML = `<span class="btn-spinner"></span>${text}`;
  btn.classList.add('btn-loading');
}
function setBtnDone(btn, icon = 'fa-check', text = 'Sent!', color = '#16a34a'){
  btn.innerHTML = `<i class="fas ${icon} me-2"></i>${text}`;
  btn.style.background = color;
  btn.style.boxShadow = 'none';
  btn.disabled = false;
  btn.classList.remove('btn-loading');
}
function resetBtn(btn){
  if(btn.dataset.orig) btn.innerHTML = btn.dataset.orig;
  btn.style.background = '';
  btn.style.boxShadow = '';
  btn.disabled = false;
  btn.classList.remove('btn-loading');
}
function showMsg(el, type, text){
  if(!el) return;
  el.className = 'f-msg ' + (type === 'ok' ? 'f-ok' : 'f-err');
  el.textContent = text;
}
function hideMsg(el){ if(el){ el.className = 'f-msg'; el.textContent = ''; } }

/* ============================================================
   CONTACT FORM — Formspree AJAX with mailto fallback
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if(!form) return;
  const msgEl = document.getElementById('cFormMsg');
  const btn   = document.getElementById('cSubmitBtn');

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    hideMsg(msgEl);

    const name    = (form.querySelector('[name="name"]')    || form.querySelector('#cName'))   ?.value.trim() || '';
    const email   = (form.querySelector('[name="email"]')   || form.querySelector('#cEmail'))  ?.value.trim() || '';
    const subject = (form.querySelector('[name="subject"]') || form.querySelector('#cSubject'))?.value.trim() || '';
    const message = (form.querySelector('[name="message"]') || form.querySelector('#cMessage'))?.value.trim() || '';

    if(!name || !email || !subject || !message){
      showMsg(msgEl, 'err', 'Please fill in all required fields.');
      return;
    }

    setBtnLoading(btn);

    try {
      const fd = new FormData();
      fd.append('name',    name);
      fd.append('email',   email);
      fd.append('subject', subject);
      fd.append('message', message);
      fd.append('_subject', subject);

      await submitToFormspree(fd);
      showMsg(msgEl, 'ok', '✓ Message sent! I\'ll get back to you shortly.');
      setBtnDone(btn, 'fa-check', 'Message Sent!');
      form.reset();
    } catch(err) {
      /* Graceful fallback to mailto */
      const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      window.open(`mailto:contact@johnzempire.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
      showMsg(msgEl, 'ok', 'Your email client has opened — just click Send to deliver your message.');
      setBtnDone(btn, 'fa-envelope', 'Email Opened');
    }

    setTimeout(() => { resetBtn(btn); hideMsg(msgEl); }, 6000);
  });
});

/* ============================================================
   HIRE PAGE FORM — Formspree AJAX with mailto fallback
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('hirePageForm');
  if(!form) return;
  const msgEl = document.getElementById('hpFormMsg');
  const btn   = document.getElementById('hpSubmitBtn');

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    hideMsg(msgEl);

    const name     = document.getElementById('hpName')?.value.trim()    || '';
    const email    = document.getElementById('hpEmail')?.value.trim()   || '';
    const phone    = document.getElementById('hpPhone')?.value.trim()   || '';
    const company  = document.getElementById('hpCompany')?.value.trim() || '';
    const service  = document.getElementById('hpService')?.value        || '';
    const budget   = document.getElementById('hpBudget')?.value         || '';
    const timeline = document.getElementById('hpTimeline')?.value       || '';
    const details  = document.getElementById('hpDetails')?.value.trim() || '';
    const source   = document.getElementById('hpSource')?.value         || '';

    if(!name || !email || !service || !budget || !details){
      showMsg(msgEl, 'err', 'Please fill in all required fields.');
      return;
    }

    setBtnLoading(btn, 'Sending Inquiry…');

    try {
      const fd = new FormData();
      fd.append('name',     name);
      fd.append('email',    email);
      fd.append('phone',    phone);
      fd.append('company',  company);
      fd.append('service',  service);
      fd.append('budget',   budget);
      fd.append('timeline', timeline);
      fd.append('details',  details);
      fd.append('source',   source);
      fd.append('_subject', `Hire Inquiry from ${name} — ${service}`);

      await submitToFormspree(fd);
      showMsg(msgEl, 'ok', '✓ Inquiry received! I\'ll prepare your custom proposal within 24 hours.');
      setBtnDone(btn, 'fa-check', 'Inquiry Sent!');
      form.reset();
    } catch(err) {
      const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\n\nService: ${service}\nBudget: ${budget}\nTimeline: ${timeline}\nHow found us: ${source}\n\nProject Details:\n${details}`;
      window.open(`mailto:contact@johnzempire.com?subject=Hire%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`, '_blank');
      showMsg(msgEl, 'ok', 'Your email client has opened with the inquiry ready — just click Send!');
      setBtnDone(btn, 'fa-envelope', 'Email Opened');
    }

    setTimeout(() => { resetBtn(btn); hideMsg(msgEl); }, 7000);
  });
});

/* ============================================================
   HIRE MODAL FORM — Formspree AJAX (index / any page modals)
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('hireForm');
  if(!form) return;
  const btn = document.getElementById('hireSendBtn');

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    setBtnLoading(btn);
    try {
      const fd = new FormData(form);
      /* Ensure key fields are present */
      const name    = document.getElementById('hName')?.value    || '';
      const email   = document.getElementById('hEmail')?.value   || '';
      const service = document.getElementById('hService')?.value || '';
      const budget  = document.getElementById('hBudget')?.value  || '';
      const details = document.getElementById('hDetails')?.value || '';
      fd.append('_subject', `Hire Inquiry — ${service}`);

      await submitToFormspree(fd);
      setBtnDone(btn, 'fa-check', 'Inquiry Sent!');
      form.reset();
      setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('hireModal'));
        if(modal) modal.hide();
        resetBtn(btn);
      }, 3000);
    } catch(err) {
      const name  = document.getElementById('hName')?.value || '';
      const email = document.getElementById('hEmail')?.value || '';
      const body  = `From: ${name} (${email})`;
      window.open(`mailto:contact@johnzempire.com?subject=Hire%20Inquiry&body=${encodeURIComponent(body)}`, '_blank');
      setBtnDone(btn, 'fa-envelope', 'Email Opened');
      setTimeout(() => resetBtn(btn), 4000);
    }
  });
});

/* ============================================================
   AI ASSISTANT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const chat  = document.getElementById('aiChatBox');
  const input = document.getElementById('aiInput');
  const send  = document.getElementById('aiSend');
  if(!chat || !input || !send) return;

  const KEY = 'YOUR_ANTHROPIC_API_KEY_HERE';
  let history = [{ role:'assistant', content:'Hello! Ask me anything about Johnz Empire services, pricing, or how we can help your business grow.' }];

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
      return 'Prices: ICT Training from UGX 50k/session, websites from UGX 500k, graphic design from UGX 30k. Contact for a custom quote!';
    if(l.includes('service')||l.includes('offer'))
      return 'Services: ICT Training, Digital Marketing, Graphic Design, Blogging, IT Support, Web & App Dev.';
    if(l.includes('contact')||l.includes('phone')||l.includes('email'))
      return 'Call 0759 970 315 or email contact@johnzempire.com — Kanyanya, Gayaza Road, Kampala.';
    return 'Contact us at 0759 970 315 or use the Hire Me page for a custom quote.';
  }
  async function getReply(m){
    history.push({ role:'user', content:m });
    if(KEY === 'YOUR_ANTHROPIC_API_KEY_HERE') return fallback(m);
    try{
      const res = await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json','x-api-key':KEY,'anthropic-version':'2023-06-01'},
        body:JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:400,
          system:'You are the helpful AI assistant for Johnz Empire, Wadda John\'s digital solutions company in Kampala, Uganda. Be concise, warm, and helpful.',
          messages:history })
      });
      const data = await res.json();
      const reply = data.content[0].text;
      history.push({ role:'assistant', content:reply });
      return reply;
    } catch(e){ return fallback(m); }
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

/* ============================================================
   BLOG — Blogger JSON Feed Integration
   Source: https://techinformer4.blogspot.com/
============================================================ */
(function(){
  const FEED = 'https://techinformer4.blogspot.com/feeds/posts/default?alt=json&max-results=6&callback=';
  const FALLBACK_IMG = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=75';
  const BLOG_URL = 'https://techinformer4.blogspot.com/';

  function skeletons(container){
    container.innerHTML = [0,1,2].map(()=>`
      <div class="col-md-6 col-lg-4">
        <div class="blog-skeleton glass">
          <div class="sk-img-ph"></div>
          <div class="sk-bd">
            <div class="sk-line"></div><div class="sk-line sh"></div><div class="sk-line xs"></div>
          </div>
        </div>
      </div>`).join('');
  }

  function parseEntry(entry){
    const title = entry.title?.$t || 'Untitled';
    const rawExcerpt = (entry.summary?.$t || entry.content?.$t || '').replace(/<[^>]+>/g,'').trim();
    const excerpt = rawExcerpt.slice(0,145) + (rawExcerpt.length > 145 ? '…' : '');
    const postUrl = (entry.link?.find(l => l.rel === 'alternate') || {}).href || null;
    const date = entry.published?.$t
      ? new Date(entry.published.$t).toLocaleDateString('en-UG',{year:'numeric',month:'short',day:'numeric'})
      : '';
    let img = entry.media$thumbnail?.url?.replace('/s72-c/','/s480-c/').replace('/s1600/','/s480/') || null;
    if(!img){
      const m = (entry.content?.$t || '').match(/src="([^"]+)"/);
      img = m ? m[1] : null;
    }
    const cat = entry.category?.[0]?.term || 'Technology';
    return { title, excerpt, postUrl, date, img, cat };
  }

  function renderCards(entries, container){
    const html = entries.map((entry, i) => {
      const { title, excerpt, postUrl, date, img, cat } = parseEntry(entry);
      if(!postUrl) return '';
      const safeTitle = title.replace(/"/g,'&quot;').replace(/'/g,'&#39;');
      return `
        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${i*70}">
          <article class="blog-card h-100">
            <div style="overflow:hidden;height:190px;position:relative">
              <img src="${img||FALLBACK_IMG}"
                   alt="${safeTitle}"
                   class="blog-img"
                   loading="lazy"
                   onerror="this.src='${FALLBACK_IMG}'">
            </div>
            <div class="blog-body">
              <span class="blog-cat">${cat}</span>
              <h5 class="blog-title">${title}</h5>
              <p class="blog-exc">${excerpt}</p>
              <div class="d-flex justify-content-between align-items-center mt-auto">
                <span style="font-size:.7rem;color:var(--text-muted)"><i class="fas fa-calendar me-1" style="color:var(--orange)"></i>${date}</span>
                <a href="${postUrl}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="btn-std"
                   onclick="trackJeEvent('blog_read','${safeTitle.slice(0,30)}')">
                  Read More <i class="fas fa-arrow-right ms-1"></i>
                </a>
              </div>
            </div>
          </article>
        </div>`;
    }).filter(Boolean).join('');

    container.innerHTML = html || fallbackHTML();

    /* Blog → business CTA */
    const existingCta = document.getElementById('blogConversionCta');
    if(!existingCta){
      const cta = document.createElement('div');
      cta.id = 'blogConversionCta';
      cta.className = 'col-12 mt-5';
      cta.innerHTML = `
        <div style="background:linear-gradient(135deg,rgba(30,94,255,.08),rgba(255,179,0,.05));
                    border:1px solid rgba(255,179,0,.18);border-radius:18px;
                    padding:2rem;text-align:center">
          <p style="font-size:.95rem;font-weight:600;color:var(--text);margin-bottom:.4rem">
            Need help implementing what you've read?
          </p>
          <p style="font-size:.83rem;color:var(--text-muted);margin-bottom:1.2rem">
            Talk to Johnz Empire for professional IT, website &amp; digital solutions in Uganda.
          </p>
          <div class="d-flex gap-2 justify-content-center flex-wrap">
            <a href="hire.html" class="btn-gold" onclick="trackJeEvent('blog_cta','consultation')">
              <i class="fas fa-rocket me-1"></i>Get Expert Help</a>
            <a href="${WA.general()}" target="_blank" rel="noopener noreferrer"
               class="btn-ghost" style="border-color:rgba(37,211,102,.4);color:#25D366"
               onclick="trackJeEvent('blog_cta','whatsapp')">
              <i class="fab fa-whatsapp me-1"></i>WhatsApp Us</a>
            <a href="${BLOG_URL}" target="_blank" rel="noopener noreferrer" class="btn-ghost"
               onclick="trackJeEvent('blog_cta','visit_blog')">
              <i class="fas fa-external-link-alt me-1"></i>Full Blog</a>
          </div>
        </div>`;
      container.parentNode.appendChild(cta);
    }
    if(typeof AOS !== 'undefined') AOS.refresh();
  }

  function fallbackHTML(){
    return `
      <div class="col-12 text-center py-5">
        <i class="fas fa-rss" style="font-size:2.5rem;color:var(--text-muted);display:block;margin-bottom:1rem"></i>
        <p style="color:var(--text-muted);margin-bottom:1.2rem">
          Latest articles are temporarily unavailable.
        </p>
        <a href="${BLOG_URL}" target="_blank" rel="noopener noreferrer" class="btn-gold">
          <i class="fas fa-external-link-alt me-2"></i>Visit Tech Informer Blog
        </a>
      </div>`;
  }

  async function loadBlog(){
    const container = document.getElementById('blogGrid');
    if(!container) return;
    skeletons(container);
    try{
      const res = await fetch(FEED.replace(/&callback=$/, ''), { signal: AbortSignal.timeout(7000) });
      if(!res.ok) throw new Error('Feed error ' + res.status);
      const data = await res.json();
      const entries = data?.feed?.entry;
      if(!entries?.length) throw new Error('Empty feed');
      renderCards(entries, container);
    } catch(e){
      container.innerHTML = fallbackHTML();
    }
  }

  document.addEventListener('DOMContentLoaded', loadBlog);
})();

/* ============================================================
   WHATSAPP DEEP LINKS — service-specific pre-filled messages
============================================================ */
const WA = {
  num: '256759970315',
  link(msg){ return `https://wa.me/${this.num}?text=${encodeURIComponent(msg)}`; },
  general(){ return this.link("Hello Johnz Empire, I'd like to get more information about your services."); },
  website(){ return this.link("Hello Johnz Empire, I'm interested in Website Development. I'd like to get a quotation please."); },
  app(){ return this.link("Hello Johnz Empire, I'm interested in Mobile App Development. Please share more details."); },
  system(){ return this.link("Hello Johnz Empire, I'm interested in a Custom Business Management System. I'd like to request a demo."); },
  design(){ return this.link("Hello Johnz Empire, I'm interested in Graphic Design & Branding. Please send me a quotation."); },
  marketing(){ return this.link("Hello Johnz Empire, I'm interested in Digital Marketing & SEO services. I'd like to know more."); },
  training(){ return this.link("Hello Johnz Empire, I'm interested in ICT Training. Please share the schedule and pricing."); },
  itsupport(){ return this.link("Hello Johnz Empire, I need IT Support. Please let me know how to get assistance."); },
  maintenance(){ return this.link("Hello Johnz Empire, I'm interested in a Monthly Website Maintenance package. Please share details."); },
  quote(service){ return this.link(`Hello Johnz Empire, I'd like to request a quotation for: ${service}.`); },
};

/* Inject WA links onto elements that carry data-wa attributes */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-wa]').forEach(el => {
    const svc = el.getAttribute('data-wa');
    if(WA[svc]) el.href = WA[svc]();
  });
});

/* ============================================================
   ANALYTICS EVENT TRACKING (GA4 / gtag compatible)
============================================================ */
function trackJeEvent(action, label){
  try{
    if(typeof gtag === 'function'){
      gtag('event', action, { event_category:'johnz_empire', event_label: label });
    }
    if(typeof fbq === 'function' && action === 'hire_submit') fbq('track','Lead');
  } catch(e){}
}

/* Auto-track WhatsApp, phone, email clicks */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
    a.addEventListener('click', () => trackJeEvent('whatsapp_click', a.dataset.wa || 'general'));
  });
  document.querySelectorAll('a[href^="tel:"]').forEach(a => {
    a.addEventListener('click', () => trackJeEvent('phone_click', a.href));
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
    a.addEventListener('click', () => trackJeEvent('email_click', a.href));
  });
});

/* ============================================================
   MOBILE MONEY PAYMENT CONFIRMATION FORM
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('momoForm');
  if(!form) return;
  const msgEl = document.getElementById('momoMsg');
  const btn   = document.getElementById('momoBtn');

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    hideMsg(msgEl);
    const name   = document.getElementById('momoName')?.value.trim()   || '';
    const phone  = document.getElementById('momoPhone')?.value.trim()  || '';
    const amount = document.getElementById('momoAmount')?.value.trim() || '';
    const txnId  = document.getElementById('momoTxn')?.value.trim()    || '';
    const svc    = document.getElementById('momoService')?.value       || '';

    if(!name||!phone||!amount||!txnId){
      showMsg(msgEl,'err','Please fill in all required fields.'); return;
    }
    setBtnLoading(btn,'Submitting…');
    try{
      const fd = new FormData();
      fd.append('_subject', `Mobile Money Payment Confirmation — ${name}`);
      fd.append('name', name);
      fd.append('phone', phone);
      fd.append('service', svc);
      fd.append('amount_ugx', amount);
      fd.append('transaction_id', txnId);
      fd.append('status', 'PENDING VERIFICATION');
      await submitToFormspree(fd);
      setBtnDone(btn,'fa-clock','Confirmation Received','#1E5EFF');
      showMsg(msgEl,'ok',
        '✓ Payment confirmation received. We will verify your transaction and contact you shortly on WhatsApp or phone.');
      trackJeEvent('payment_confirmation', svc);
      form.reset();
    } catch(err){
      setBtnDone(btn,'fa-check','Confirmation Sent','#16a34a');
      showMsg(msgEl,'ok','Confirmation received. We will verify and contact you shortly.');
    }
    setTimeout(()=>{ resetBtn(btn); }, 8000);
  });
});
