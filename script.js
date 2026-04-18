/* ── script.js ── Alexandre Mouloubou Portfolio ── */

// ── TYPED EFFECT ──
const typedEl = document.getElementById('typed');
const phrases = [
  'Développeur Full Stack',
  'Data Scientist',
  'Backend Engineer',
  'Frontend Developer',
  'Big Data Enthusiast',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex--);
  } else {
    typedEl.textContent = current.slice(0, charIndex++);
  }

  if (!isDeleting && charIndex > current.length) {
    isDeleting = true;
    return setTimeout(typeLoop, 1600);
  }
  if (isDeleting && charIndex < 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    return setTimeout(typeLoop, 400);
  }
  setTimeout(typeLoop, isDeleting ? 45 : 80);
}
setTimeout(typeLoop, 1200);


// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightNav();
});


// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      const match = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}


// ── BURGER MENU ──
const burger = document.getElementById('burger');
const navLinksList = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinksList.classList.toggle('open');
});

navLinksList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinksList.classList.remove('open');
  });
});


// ── SKILLS TABS ──
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.skills-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => {
      p.classList.remove('active');
      p.querySelectorAll('.skill-fill').forEach(f => f.style.width = '0');
      p.querySelectorAll('.skill-card').forEach(c => c.classList.remove('visible'));
    });
    btn.classList.add('active');
    const panel = document.getElementById(`tab-${target}`);
    panel.classList.add('active');
    setTimeout(() => animateSkillCards(panel), 30);
  });
});

function animateSkillCards(panel) {
  const cards = panel.querySelectorAll('.skill-card');
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('visible');
      const fill = card.querySelector('.skill-fill');
      if (fill) fill.style.width = fill.dataset.w + '%';
    }, i * 80);
  });
}

// Animate initial tab
setTimeout(() => {
  const activePanel = document.querySelector('.skills-panel.active');
  if (activePanel) animateSkillCards(activePanel);
}, 300);


// ── INTERSECTION OBSERVER (general reveal) ──
const revealEls = document.querySelectorAll(
  '.service-card, .timeline-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// Skill cards also triggered by tab switch above + scroll
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const panel = document.querySelector('.skills-panel.active');
      if (panel) animateSkillCards(panel);
      skillObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);


// ── CONTACT FORM ──
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.textContent = 'Envoyer le message →';
      btn.disabled = false;
      successMsg.classList.remove('hidden');
      setTimeout(() => successMsg.classList.add('hidden'), 5000);
    }, 1200);
  });
}


// ── SMOOTH SCROLL for all anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


// ── CURSOR GLOW EFFECT (subtle) ──
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 300px; height: 300px; border-radius: 50%;
  background: radial-gradient(circle, rgba(176,255,0,0.04) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.15s, top 0.15s;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
