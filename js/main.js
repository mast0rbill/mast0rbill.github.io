// Cursor glow
const glow = document.getElementById('cursor-glow');
if (glow) {
  window.addEventListener('mousemove', e => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  }, { passive: true });
}

// Navbar scroll state
const nav = document.getElementById('site-nav');
function updateNav() {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 40);
}
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

// Project filter
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

// Scroll-in animations
const fadeEls = document.querySelectorAll('.fade-up');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => io.observe(el));
} else {
  fadeEls.forEach(el => el.classList.add('visible'));
}

// Scroll hint
document.querySelector('.hero-scroll')?.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
});
