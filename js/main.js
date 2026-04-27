// ── Cursor glow ──────────────────────────────────────────────
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);
window.addEventListener('mousemove', e => {
  glow.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
}, { passive: true });

// ── Navbar: transparent over dark hero, frosted after scrolling ──
const nav   = document.getElementById('site-nav');
const hero  = document.querySelector('.hero');

function updateNav() {
  if (!nav) return;
  const scrolled = window.scrollY > 40;
  nav.classList.toggle('scrolled', scrolled);
  if (hero) {
    const heroBottom = hero.getBoundingClientRect().bottom;
    nav.classList.toggle('on-hero', heroBottom > 60);
  }
}
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

// ── Project filter ────────────────────────────────────────────
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

// ── Scroll-in animations ──────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-up');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => io.observe(el));
} else {
  fadeEls.forEach(el => el.classList.add('visible'));
}

// ── Scroll hint click ─────────────────────────────────────────
document.querySelector('.hero-scroll')?.addEventListener('click', () => {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
});
