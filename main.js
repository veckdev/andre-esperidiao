// ─────────────────────────────────────────────────────
// INDEX SLIDESHOW IMAGES
// Add or remove paths to control the homepage slideshow.
// ─────────────────────────────────────────────────────
const indexImages = [
  'assets/IMG_1949.jpg',
  'assets/IMG_3706.jpg',
  'assets/edge-003.jpg',
];

// ─────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────
const projects = [
  {
    id: 'edge',
    cover: 'assets/edge-001.jpg',
    images: ['assets/edge-004.jpg', 'assets/edge-001.jpg', 'assets/edge-005.jpg', 'assets/edge-003.jpg', 'assets/edge-006.jpg', 'assets/edge-007.jpg', 'assets/edge-banner.jpg'],
  },
  {
    id: 'street',
    cover: 'assets/street-007.jpg',
    images: ['assets/street-001.jpg', 'assets/street-002.jpg', 'assets/street-003.jpg', 'assets/street-004.jpg', 'assets/street-005.jpg', 'assets/street-006.jpg', 'assets/street-007.jpg', 'assets/street-008.jpg', 'assets/street-009.jpg'],
  },
  {
    id: 'vico',
    cover: 'assets/vico-005.jpg',
    images: ['assets/vico-007.jpg', 'assets/vico-002.jpg', 'assets/vico-003.jpg', 'assets/vico-004.jpg', 'assets/vico-005.jpg', 'assets/vico-001.jpg', 'assets/vico-006.jpg'],
  },
  {
    id: 'close',
    cover: 'assets/close-005.jpg',
    images: ['assets/close-007.jpg', 'assets/close-002.jpg', 'assets/close-004.jpg', 'assets/close-001.jpg', 'assets/close-006.jpg', 'assets/close-003.jpg', 'assets/close-005.jpg'],
  },
];

// ─────────────────────────────────────────────────────
// INDEX
// ─────────────────────────────────────────────────────
function initIndex() {
  const container = document.getElementById('scrollContainer');
  if (!container) return;

  indexImages.forEach(src => {
    const slide = document.createElement('div');
    slide.className = 'slide';

    const img = document.createElement('img');
    img.src = src;
    img.alt = '';

    img.addEventListener('load', () => {
      if (window.innerWidth > 768 && img.naturalHeight > img.naturalWidth) {
        const ratio = img.naturalWidth / img.naturalHeight;
        slide.style.flex = `0 0 ${100 * ratio}vh`;
        slide.style.width = `${100 * ratio}vh`;
      }
    });

    slide.appendChild(img);
    container.appendChild(slide);
  });

  // wheel → horizontal scroll on desktop
  container.addEventListener('wheel', e => {
    if (window.innerWidth > 768) {
      e.preventDefault();
      container.scrollLeft += e.deltaY + e.deltaX;
    }
  }, { passive: false });

  // burger (index has its own nav markup)
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      burger.classList.toggle('open', open);
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
      });
    });
  }
}

// ─────────────────────────────────────────────────────
// WORK
// ─────────────────────────────────────────────────────
function initWork() {
  const grid = document.getElementById('work-grid');
  if (!grid) return;

  projects.forEach(project => {
    const el = document.createElement('a');
    el.href = `project.html?id=${project.id}`;
    el.className = 'project-link';
    el.innerHTML = `
      <div class="reveal-image image-container work-img-centered md-w-40" style="aspect-ratio:3/4;">
        <div class="shimmer"></div>
        <img src="${project.cover}" alt="" loading="lazy"
             style="width:100%;height:100%;object-fit:cover;" />
      </div>
    `;
    grid.appendChild(el);
  });
}

// ─────────────────────────────────────────────────────
// PROJECT PAGE
// ─────────────────────────────────────────────────────
function initProject() {
  const page = document.getElementById('project-page');
  if (!page) return;

  const id = new URLSearchParams(window.location.search).get('id');
  const project = projects.find(p => p.id === id);

  if (!project) {
    page.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;">
        <p class="font-sans-ui text-muted">Project not found</p>
      </div>`;
    return;
  }

  document.title = 'André Esperidião — Photography';

  const imageSeriesHtml = project.images.map(src => `
    <div class="work-img-centered md-w-40">
      <img src="${src}" alt="" loading="lazy" class="reveal-image"
           style="width:100%;height:auto;display:block;" />
    </div>`
  ).join('');

  page.innerHTML = `
    <section class="image-series" style="padding-top:10rem;">
      ${imageSeriesHtml}
    </section>
  `;

  initRevealImages();
  initImageLoad();

  // scroll past hero on load
  document.querySelector('.project-hero-img')
    ?.closest('section')
    ?.nextElementSibling
    ?.scrollIntoView({ behavior: 'instant' });

  // animate title, meta, subtitle
  setTimeout(() => {
    page.querySelectorAll('.project-detail-title, .project-detail-meta, .project-detail-subtitle')
      .forEach(el => el.classList.add('animate'));
  }, 50);
}

// ─────────────────────────────────────────────────────
// SHARED
// ─────────────────────────────────────────────────────
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

  // active link
  const file = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.desktop-nav .nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === file) link.classList.add('active');
  });
}

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

function initHeroAnimations() {
  const title = document.querySelector('.hero-title');
  const year = document.querySelector('.hero-year');
  setTimeout(() => {
    if (title) title.classList.add('animate');
    if (year) year.classList.add('animate');
  }, 50);
}

// ─────────────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // year in all footers
  document.querySelectorAll('.footer-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  initPageTransition();
  initIndex();
  initWork();
  initProject();
  initNavigation();
  initHeroAnimations();
  initRevealImages();
  initImageLoad();
});