# 🧠 MASTER AI UPGRADE PROMPT — Johnz Empire Portfolio v4
## Written by a Senior Developer (30+ years experience)

---

## ROLE

You are a world-class senior full-stack developer and creative director with 30+ years of experience building award-winning digital portfolios and agency websites. You specialise in vanilla HTML/CSS/JavaScript and Bootstrap 5. Your reference benchmark is https://zavora.digital — match or exceed its animation quality, polish, and UX sophistication.

---

## PROJECT OVERVIEW

**Client:** Wadda John — Software Developer & IT Consultant  
**Brand:** Johnz Empire  
**Location:** Kampala, Uganda  
**Website:** https://johnzempire.com  
**GitHub:** https://github.com/tinacatina12  
**YouTube:** https://youtube.com/@johnzempire  
**TikTok:** https://www.tiktok.com/@johnzempire  
**WhatsApp:** https://wa.me/256759970315  
**Email:** contact@johnzempire.com  
**Phone:** 0759 970 315  
**Address:** Kanyanya, Gayaza Road, Behind Gaz Petrol Station, Kampala  

---

## TECH STACK (STRICT — DO NOT DEVIATE)

- HTML5 (semantic)
- CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (ES6+)
- Bootstrap 5.3 (CDN)
- Font Awesome 6.4 (CDN)
- Google Fonts: Syne (headings, 700/800) + DM Sans (body, 300/400/500)
- AOS.js 2.3.1 (scroll animations)
- NO React, NO Vue, NO Webpack, NO npm build steps

---

## DESIGN SYSTEM

```css
:root {
  /* Brand */
  --navy: #0B3D91;
  --orange: #FF8A00;
  --orange-lt: #FFA533;
  --orange-glow: rgba(255,138,0,.22);
  --navy-glow: rgba(11,61,145,.35);

  /* Dark Mode (default) */
  --bg: #06080f;
  --bg-alt: #0a0d1c;
  --bg-card: rgba(255,255,255,.04);
  --border: rgba(255,255,255,.08);
  --text: #ffffff;
  --text-sub: rgba(255,255,255,.78);
  --text-muted: rgba(255,255,255,.48);

  /* Typography */
  --font-head: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;

  /* Motion */
  --ease: cubic-bezier(.4,0,.2,1);
  --bounce: cubic-bezier(.34,1.56,.64,1);
  --dur-fast: 150ms;
  --dur-mid: 300ms;
  --dur-slow: 600ms;
}
```

### Gradient Text
```css
.text-grad {
  background: linear-gradient(135deg, var(--orange), #ffd080);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## PAGE STRUCTURE (MULTIPAGE)

### 1. `index.html` — Main Homepage
Sections in order:
1. Splash screen (1.5s, fade out)
2. Cookie consent banner (bottom, with Accept / Decline)
3. Navbar (fixed, glassmorphism, links to all pages)
4. HERO — Full-viewport with code BG image + gradient overlay + spinning profile ring + typewriter + floating stat cards
5. Ticker marquee (infinite horizontal scroll, navy gradient)
6. ABOUT — Split layout: image left (with badge + mini stats), skills/bio right
7. VIDEO / ANIMATION SECTION — Animated showcase between About and Services. CSS-animated service icons cycling through all 6 services with text reveals. Background: dark with radial gradient orbs. Use canvas particle effects. NO actual video required — pure CSS/JS animation.
8. SERVICES — 6 cards, each with a relevant Unsplash image at top (160px), glassmorphism body, pricing hint, features list, learn-more toggle
9. HOW I WORK — 5-step process on a blurred background image
10. STATS — Full-bleed image background + navy overlay + 4 animated counter numbers
11. WHY CHOOSE US — 3 reason cards with images
12. HORIZONTAL PORTFOLIO STRIP — Infinite scrolling marquee band (like zavora.digital) showing portfolio screenshots side by side, 2 rows moving in opposite directions
13. CASE STUDIES — 3 cards with problem/solution/outcome labels
14. BLOG PREVIEW — 3 blog cards with images
15. TRUSTED BY — Client logos with grayscale/colour hover
16. SOFTWARE SYSTEMS — 3 system cards
17. PRICING — 3 tiers (Basic, Business, Enterprise)
18. CERTIFICATIONS — 3 cards
19. TESTIMONIALS — Bootstrap carousel with star ratings
20. EXPERIENCE TIMELINE — Vertical timeline
21. FAQ — Accordion
22. CONTACT — Split: form left (mailto: submission), info right + WhatsApp block
23. Footer — 4-column

### 2. `graphics.html` — Graphics Design Portfolio
- Same navbar + footer as index
- Hero: "Creative Work & Design Portfolio" with particle BG
- Filter tabs: All | Logos | Flyers | Social Media | Branding
- Masonry grid (CSS columns: 3 on desktop, 2 on tablet, 1 on mobile)
- Each image card: hover overlay with zoom icon + project name
- Lightbox: click opens fullscreen modal with prev/next navigation, close button
- All 19 client-provided image URLs displayed
- Entrance animation: stagger fade-up (50ms delay between cards)

### 3. `portfolio.html` — Web & App Projects
- Same navbar + footer as index
- Hero: "Web & App Projects"
- GitHub API auto-fetch: `https://api.github.com/users/tinacatina12/repos?sort=updated&per_page=50`
  - Auto-render new repos as they're pushed — no manual update needed
  - Show: repo name, description, language, stars, last updated, live URL (homepage), GitHub URL
  - Handle API rate limit gracefully: show manually-defined fallback projects
- Filter: All | Websites | Apps | Systems
- Each project card: screenshot (Unsplash placeholder if no image), title, description, tech stack pills, "Live Demo" + "GitHub" buttons
- Loading skeleton shown while API fetches

---

## FEATURE SPECIFICATIONS

### Cookie Consent (index.html + shared on all pages)
```
Position: fixed, bottom-left, z-index 9998
Style: glassmorphism dark card, border-top: 2px solid var(--orange)
Text: "We use cookies to enhance your experience. By continuing, you agree to our use of cookies."
Buttons: [Accept All] (orange filled) [Decline] (ghost)
Behaviour: Accept → set cookie "je_cookie=accepted", hide banner. Decline → set "je_cookie=declined", hide.
On load: check localStorage. If already set, don't show.
```

### Social Popup (index.html)
```
Trigger: After user has been on page for 60 seconds (setTimeout 60000ms)
Don't show if: user already dismissed this session (sessionStorage flag)
Style: Centered modal, glassmorphism, max-width 400px, animated entrance (scale from 0.8, fade in)
Header: "Stay Connected with Johnz Empire 🌟"
Subtext: "Follow us for tips, tutorials, and behind-the-scenes content"
Buttons (full-width, stacked):
  1. [▶ Subscribe on YouTube] → https://youtube.com/@johnzempire — red button
  2. [♪ Follow on TikTok] → https://www.tiktok.com/@johnzempire — dark/pink gradient button  
  3. [💬 Message on WhatsApp] → https://wa.me/256759970315 — green button
Close button: top-right X, clicking X or overlay sets sessionStorage flag, modal hides
```

### Video/Animation Section (between About & Services)
```
Section height: min-height 600px
Background: dark (#06080f) with animated radial gradient orbs floating
Content: 
  - Left: Large animated number counter cycling: "6 Services | 250+ Projects | 5+ Years | 150+ Clients"
  - Center: Rotating service icons in a circular orbit animation
  - Right: Service name cycling with typewriter effect + brief description
  - Bottom: "Scroll to explore our services" CTA arrow
  - Background: canvas particle stream
Animation: 60fps CSS animation, smooth, no jank
Heading: "Everything Your Business Needs — Under One Roof"
```

### Horizontal Portfolio Strip (zavora-style)
```
Two rows:
  Row 1: Scrolls LEFT continuously (animation: 40s linear infinite)
  Row 2: Scrolls RIGHT continuously (animation: 45s linear infinite reverse)
Each row: 8-10 portfolio screenshot images, each 280px wide × 180px tall
Images: Use existing Unsplash portfolio images
On hover: pause animation, image scales 1.05
Overflow: hidden, no scrollbar
```

### Contact Form Fix (CRITICAL)
```
PRIMARY METHOD (always works, no backend needed):
  1. Collect form values
  2. Validate (required fields, email format)
  3. Construct mailto: URL:
     mailto:contact@johnzempire.com?subject=SUBJECT&body=BODY
  4. window.open(mailtoUrl, '_blank')
  5. Show success: "Your message has been prepared. Please click Send in your email client."

SECONDARY METHOD (try Formspree first, fall back to mailto):
  Try: POST to https://formspree.io/f/YOUR_FORM_ID
  If fail: fall back to mailto method
  
UI: Loading spinner on button while processing. Success message (green) or error (orange, not red — never show failure).
```

### GitHub Auto-fetch (portfolio.html)
```javascript
async function loadGitHubRepos() {
  const fallback = [ /* your manual projects here */ ];
  try {
    const res = await fetch(
      'https://api.github.com/users/tinacatina12/repos?sort=updated&per_page=50',
      { headers: { 'Accept': 'application/vnd.github.v3+json' } }
    );
    if (!res.ok) { renderProjects(fallback); return; }
    const repos = await res.json();
    const projects = repos
      .filter(r => !r.fork && r.name !== 'tinacatina12')
      .map(r => ({
        title: r.name.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()),
        desc: r.description || 'A web project by Wadda John',
        url: r.homepage || r.html_url,
        github: r.html_url,
        lang: r.language || 'HTML',
        stars: r.stargazers_count,
        updated: new Date(r.pushed_at).toLocaleDateString()
      }));
    const all = [...fallback, ...projects.filter(p => !fallback.find(f => f.github === p.github))];
    renderProjects(all);
  } catch(e) {
    renderProjects(fallback);
  }
}
```

---

## ANIMATION SPECIFICATIONS (Zavora-level Quality)

### Entrance Animations (scroll-triggered)
```css
/* All section content uses these */
.reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
/* Stagger: each child gets 80ms additional delay */
```

### Card Hover (Consistent across all cards)
```css
.card:hover {
  transform: translateY(-8px);
  border-color: rgba(255,138,0,.3);
  box-shadow: 0 24px 60px rgba(255,138,0,.18);
  transition: all 350ms cubic-bezier(.4,0,.2,1);
}
```

### Button Shimmer Effect
```css
.btn::before {
  content: '';
  position: absolute; inset: 0;
  background: rgba(255,255,255,.12);
  transform: translateX(-105%);
  transition: transform 300ms ease;
}
.btn:hover::before { transform: translateX(0); }
```

### Navbar Scroll Behaviour
- Transparent on top → frosted glass on scroll
- Slight padding reduction when scrolled
- Border-bottom appears with orange tint when scrolled

### Page Load
- Splash: 1500ms → fade out 1000ms
- Hero content: staggered fadeUp (0.1s, 0.25s, 0.4s, 0.55s, 0.7s, 0.85s delays)
- Canvas particles: 35 floating dots, orange in dark mode, navy in light

---

## RESPONSIVENESS REQUIREMENTS

All breakpoints must be perfect:
- **375px** (iPhone SE) — single column, compact spacing
- **425px** (mobile L)
- **768px** (tablet) — 2-column grid
- **1024px** (laptop) — 3-column grid
- **1440px** (desktop) — full layout
- **1920px** (large) — max-width 1400px container

### Mobile Navbar
- Hamburger icon transforms to X on open
- Full-screen overlay menu with links, dark backdrop
- Smooth slide-down animation
- Prevent body scroll when open

### Critical Mobile Fixes
- Touch targets: min 44×44px
- No horizontal scroll
- Font sizes: clamp() for responsive scaling
- Cards: full-width on mobile, 2-col tablet, 3-col desktop
- Hero image: centred, smaller (180px) on mobile
- Timeline: single column (left-aligned) on mobile
- Stats: 2×2 grid on mobile

---

## SEO & PERFORMANCE

### Meta Tags (all pages)
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta property="og:title" content="...">
<meta property="og:image" content="...">
<link rel="canonical" href="...">
```

### Structured Data (index.html)
- Person schema (Wadda John)
- LocalBusiness schema (Johnz Empire)

### Performance
- `loading="lazy"` on all non-critical images
- `fetchpriority="high"` on hero image only
- `preconnect` to Google Fonts, CDNs
- Critical CSS inlined or in `<head>`
- Scripts at bottom with `defer`

---

## CONTENT TO PRESERVE (ALL ORIGINAL DATA)

### Personal
- Name: Wadda John
- Title: Software Developer & IT Consultant
- Location: Kanyanya, Gayaza Road, Behind Gaz Petrol Station, Kampala
- Phone: 0759 970 315
- Email: contact@johnzempire.com
- CV URL: https://docs.google.com/document/d/1bMrWAQtCxHjTNYi10ZyVXz-bgwuuIqq3/edit

### Services (6)
ICT Training (UGX 50k/session), Digital Marketing (100k/month), Graphic Design (30k/design), Blogging (20k/article), IT Support (25k/service), Web & Mobile Dev (500k/project)

### Stats: 150+ clients, 250+ projects, 5+ years, 10+ team members

### Case Studies: Ugonlinemedia (300% traffic growth), Sigmac Motors (70% data entry reduction), SPU Developers (200 students)

### Testimonials: Mr. Solo Saidi (Buvuma District), Mr. Nyonda Robert (Sigmac Motors), Mrs. Asiimire Marion (Biostatistician), Ugahits Media

### Experience: Ugahits Media (2022–present), Sigmac Motors Uganda (2021–22), Cyber Computer Solution (2019–21)

### Education: St. Peter's University, St. Joseph's SS Kakindu, St. Mary's Primary Mukono

### Skills: HTML/CSS 95%, JavaScript 90%, PHP 85%, Flutter/Dart 80%, Graphic Design 90%

### Pricing: Basic UGX 500K (5 pages, 1mo support), Business UGX 1.5M (15 pages, 3mo support), Enterprise UGX 3M+ (unlimited, 6mo support)

### Portfolio Projects (existing):
- Ugonlinemedia: https://ugandaonlinemedia.blogspot.com/
- UgModed: https://ugapps256.blogspot.com/
- Android Tips: https://techinformer4.blogspot.com/
- Vas Nektar: https://vasnektar256.blogspot.com/
- SPU Developers: https://tinacatina12.github.io/peters/
- Ugonline Radio: https://radio-uganda.com/534-ugonlinemedia.html

### Graphics Images (19 URLs):
1. https://lh3.googleusercontent.com/geougc/AF1QipN89eKhcxmsztn0AUHs6fszV__YhnTtPwpIoXx5=w573-h573-p-no
2. https://lh3.googleusercontent.com/geougc/AF1QipMoaCAGuEwCc-PGNhqAEHjJWfLXPMidIg1TohON=w573-h573-p-no
3. https://lh3.googleusercontent.com/geougc/AF1QipNWjiz2Pm1wZ9kNzmR_j7ztIZZnq157yT-ZgebY=w573-h573-p-no
4. https://lh3.googleusercontent.com/geougc/AF1QipO5D3e06555Velq0K9Uxa1swX0QZZSGJ5glRdBV=w573-h573-p-no
5. https://lh3.googleusercontent.com/geougc/AF1QipOPNaJ7Aca_IxJEug3h75CWgLvDBUQtJf3LQ8NG=w573-h573-p-no
6. https://lh3.googleusercontent.com/geougc/AF1QipPUGoNEVUmLLfk4eZWadEIekPk7Q3b0sYTzA56c=w573-h573-p-no
7. https://lh3.googleusercontent.com/geougc/AF1QipN2opjyeJvArGz-27vearqspJwB-qL4on6alOgt=w573-h573-p-no
8. https://lh3.googleusercontent.com/geougc/AF1QipPRxVxVzD-hJ6DMLHHK4MkZyXhMIj2eiB8jcNAw=w573-h573-p-no
9. https://lh3.googleusercontent.com/geougc/AF1QipOnVUCwEtepzZOzoDC2WNQtlmCNpqLo_m6uIlJg=w573-h573-p-no
10. https://lh3.googleusercontent.com/geougc/AF1QipMzvkW-7ftAhnIMhdBNaMTLzmaLfCmml-Lj6cIz=w573-h573-p-no
11. https://lh3.googleusercontent.com/geougc/AF1QipMmzp1Yig8G0A3EIj5kHgNz3Hfsmwu1xengiFFb=w573-h573-p-no
12. https://lh3.googleusercontent.com/geougc/AF1QipMOInvoEOSh2wz5NlXX4erHMNvnReGZSzS5zGAk=w573-h573-p-no
13. https://lh3.googleusercontent.com/geougc/AF1QipMd-VGsuIzdXPJrawzzisCR8VCFB7jgJ9urinj0=w573-h573-p-no
14. https://lh3.googleusercontent.com/geougc/AF1QipOIOacFDWLhOgm42QQ3RaOrhBDi9ibTlQCZ5SOc=w573-h573-p-no
15. https://lh3.googleusercontent.com/geougc/AF1QipNO6E4-1pTnz6SR-Lx3HSGDFq-qgskqu8j6F5ei=w573-h573-p-no
16. https://lh3.googleusercontent.com/geougc/AF1QipPaObM4J7xn-4J5ny02TeGdtYgxTBWGSoTT2Q1K=w573-h573-p-no
17. https://lh3.googleusercontent.com/geougc/AF1QipMlnUZDHcX9PrkntKSGj24CJABNniejPlTb-LR9=w573-h573-p-no
18. https://lh3.googleusercontent.com/geougc/AF1QipNPxx8fX5gkARYjuNH98WoId583C0VOk35QWYgE=w573-h573-p-no
19. https://lh3.googleusercontent.com/geougc/AF1QipPovfPmVaWHq2yvvA0f5LVYU63TYDy857rGOxTh=w573-h573-p-no

---

## QUALITY STANDARDS

- No emojis used as icons — use SVG / Font Awesome only
- `cursor: pointer` on ALL interactive elements
- All external links: `target="_blank" rel="noopener noreferrer"`
- All images: descriptive `alt` text
- `aria-label` on all icon-only buttons
- Focus states visible for keyboard navigation
- Contrast ratio: 4.5:1 minimum for text
- Smooth transitions: 150–350ms with ease curves
- Never show hard red error messages — always warm/helpful fallbacks
- prefers-reduced-motion: respected globally
- Loading states on async operations

---

## DELIVERABLES

Generate 3 files:
1. `index.html` — Full homepage (~2000–2500 lines)
2. `graphics.html` — Graphics portfolio page (~800–1000 lines)
3. `portfolio.html` — Web/app portfolio page with GitHub API (~900–1100 lines)

All files must share the same design system, navbar, footer, cookie consent, and social popup logic. Files work as standalone HTML — no build step, no server required. Open in browser directly.

---

*End of Master Prompt. Save this file and use it with any AI assistant to regenerate or upgrade the Johnz Empire website.*
