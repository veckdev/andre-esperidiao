/* ─────────────────────────────────────────────────
   projects data — update image paths in assets/
───────────────────────────────────────────────── */
const projects = [
  {
    id: 'edge',
    title: 'Edge',
    subtitle: 'Shot at Whiterock, this series sits somewhere between exposure and restraint — not just in the landscape, but in the way the body occupies it. Nothing feels fixed or performative.\n\nMasculinity here isn\'t treated as a single idea, but as something fluid, shifting from frame to frame. At times it feels grounded and self-assured, at others distant, almost untouchable. The model moves through these states without fully settling into any of them.\n\nThe result is less about defining a persona and more about allowing space for contradiction — a quiet tension between control and vulnerability, presence and escape.',
    year: '2026',
    cover: 'assets/edge.webp',
    images: ['assets/edge.webp', 'assets/work-4.jpg', 'assets/work-6.jpg'],
    category: 'Editorial',
  },
  {
    id: 'street',
    title: 'Street Style Season',
    subtitle: 'Grafton Street doesn\'t stop for anyone. The series leans into that — finding stillness inside movement, composure inside noise. The Ganni trench coat becomes a kind of armor. Not protective in the defensive sense, but in the way certain clothes allow you to move through a space entirely on your own terms. This is street style without the casualness the term implies. Every frame feels considered — not staged, but chosen.',
    year: '2026',
    cover: 'assets/street-banner.jpg',
    hero: 'assets/street-002.jpg',
    images: ['assets/street-001.jpg', 'assets/street-002.jpg', 'assets/street-003.jpg', 'assets/street-004.jpg', 'assets/street-005.jpg', 'assets/street-006.jpg', 'assets/street-007.jpg', 'assets/street-008.jpg', 'assets/street-009.jpg'],
    category: 'Fashion',
  },
  {
    id: 'vico',
    title: 'Vico Bathing',
    subtitle: 'Light & Adornmen',
    year: '2026',
    cover: 'assets/bathing-banner.jpg',
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
  const year = document.querySelector('.hero-year');
  // Small timeout ensures the browser has painted opacity:0 first
  setTimeout(() => {
    if (title) title.classList.add('animate');
    if (year) year.classList.add('animate');
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
