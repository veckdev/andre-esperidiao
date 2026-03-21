/* ─────────────────────────────────────────────────
   projects data — update image paths in assets/
───────────────────────────────────────────────── */
const projects = [
  {
    id: 'edge',
    title: 'Edge',
    subtitle: 'A Study in Shadow',
    year: '2026',
    cover: 'assets/edge.webp',
    images: ['assets/edge.webp', 'assets/work-4.jpg', 'assets/work-6.jpg'],
    category: 'Editorial',
  },
  {
    id: 'boulevard',
    title: 'Boulevard',
    subtitle: 'Urban Architecture',
    year: '2023',
    cover: 'assets/hero-2.jpg',
    images: ['assets/hero-2.jpg', 'assets/work-1.jpg', 'assets/work-5.jpg'],
    category: 'Fashion',
  },
  {
    id: 'lumiere',
    title: 'Lumière',
    subtitle: 'Light & Adornment',
    year: '2023',
    cover: 'assets/hero-3.jpg',
    images: ['assets/hero-3.jpg', 'assets/work-3.jpg', 'assets/work-2.jpg'],
    category: 'Beauty',
  },
  {
    id: 'silhouette',
    title: 'Silhouette',
    subtitle: 'Form & Structure',
    year: '2022',
    cover: 'assets/work-1.jpg',
    images: ['assets/work-1.jpg', 'assets/hero-1.jpg', 'assets/work-4.jpg'],
    category: 'Editorial',
  },
  {
    id: 'ethereal',
    title: 'Ethereal',
    subtitle: 'Wind & Motion',
    year: '2022',
    cover: 'assets/work-2.jpg',
    images: ['assets/work-2.jpg', 'assets/work-5.jpg', 'assets/hero-2.jpg'],
    category: 'Campaign',
  },
  {
    id: 'fragments',
    title: 'Fragments',
    subtitle: 'Reflections in Geometry',
    year: '2021',
    cover: 'assets/work-5.jpg',
    images: ['assets/work-5.jpg', 'assets/work-3.jpg', 'assets/work-6.jpg'],
    category: 'Art',
  },
];

/* ─────────────────────────────────────────────────
   Navigation
───────────────────────────────────────────────── */
function initNavigation() {
  const toggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!toggle || !mobileMenu) return;

  let open = false;

  toggle.addEventListener('click', () => {
    open = !open;
    toggle.textContent = open ? 'Close' : 'Menu';
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      open = false;
      toggle.textContent = 'Menu';
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active link
  const file = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.desktop-nav .nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === file) link.classList.add('active');
  });
}

/* ─────────────────────────────────────────────────
   Scroll Reveal
───────────────────────────────────────────────── */
function initRevealImages() {
  const elements = document.querySelectorAll('.reveal-image');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '-80px 0px', threshold: 0.01 });

  elements.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────────
   Shimmer + image load fade
───────────────────────────────────────────────── */
function initImageLoad() {
  document.querySelectorAll('.image-container img').forEach(img => {
    const container = img.closest('.image-container');
    const shimmer = container ? container.querySelector('.shimmer') : null;

    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';

    const reveal = () => {
      img.style.opacity = '1';
      if (shimmer) shimmer.style.display = 'none';
    };

    if (img.complete && img.naturalWidth > 0) {
      reveal();
    } else {
      img.addEventListener('load', reveal);
      img.addEventListener('error', () => {
        if (shimmer) shimmer.style.display = 'none';
      });
    }
  });
}

/* ─────────────────────────────────────────────────
   Page fade-in
───────────────────────────────────────────────── */
function initPageTransition() {
  const main = document.querySelector('main.page');
  if (!main) return;
  main.style.opacity = '0';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      main.style.transition = 'opacity 0.4s cubic-bezier(0.22,1,0.36,1)';
      main.style.opacity = '1';
    });
  });
}

/* ─────────────────────────────────────────────────
   Hero animations — title slides up, year fades in
───────────────────────────────────────────────── */
function initHeroAnimations() {
  const title = document.querySelector('.hero-title');
  const year  = document.querySelector('.hero-year');
  // Small timeout ensures the browser has painted opacity:0 first
  setTimeout(() => {
    if (title) title.classList.add('animate');
    if (year)  year.classList.add('animate');
  }, 50);
}

/* ─────────────────────────────────────────────────
   Boot
───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initPageTransition();
  initNavigation();
  initHeroAnimations();
  initRevealImages();
  initImageLoad();
});
