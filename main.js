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
    title: 'Edge',
    subtitle: 'Shot at Whiterock, this series sits somewhere between exposure and restraint, not just in the landscape, but in the way the body occupies it. Nothing feels fixed or performative.\n\nMasculinity here isn\'t treated as a single idea, but as something fluid, shifting from frame to frame. At times it feels grounded and self-assured, at others distant, almost untouchable. The model moves through these states without fully settling into any of them.\n\nThe result is less about defining a persona and more about allowing space for contradiction, a quiet tension between control and vulnerability, presence and escape.',
    year: '2026',
    cover: 'assets/edge-newbanner.jpg',
    hero: 'assets/edge-001.jpg',
    images: ['assets/edge-004.jpg', 'assets/edge-001.jpg', 'assets/edge-005.jpg', 'assets/edge-003.jpg', 'assets/edge-006.jpg', 'assets/edge-007.jpg', 'assets/edge-banner.jpg'],
  },
  {
    id: 'street',
    title: 'Street Style Season',
    subtitle: 'Grafton Street doesn\'t stop for anyone. The series leans into that, finding stillness inside movement, composure inside noise. The Ganni trench coat becomes a kind of armor. Not protective in the defensive sense, but in the way certain clothes allow you to move through a space entirely on your own terms. This is street style without the casualness the term implies. Every frame feels considered, not staged, but chosen.',
    year: '2026',
    cover: 'assets/street-banner.jpg',
    hero: 'assets/street-001.jpg',
    images: ['assets/street-001.jpg', 'assets/street-002.jpg', 'assets/street-003.jpg', 'assets/street-004.jpg', 'assets/street-005.jpg', 'assets/street-006.jpg', 'assets/street-007.jpg', 'assets/street-008.jpg', 'assets/street-009.jpg'],
  },
  {
    id: 'vico',
    title: 'The Irish Series',
    subtitle: 'The Irish Series is an ongoing photographic exploration of identity, presence, and cultural memory. Through encounters across Ireland, I photograph individuals who embody a certain Irish essence, often reflected in their Gaelic names, their gestures, and the quiet strength carried in their presence. These are people I cross paths with, not casted, but found. The work moves through elements deeply rooted in Irish culture: the ritual of sea swimming, the stillness of a pint of Guinness, and the enduring archetypes of the Irish man. Each image exists between documentary and editorial, raw yet intentional, intimate yet structured. At its core, the series is not about defining Ireland, but about observing it closely, through faces, atmospheres, and fleeting moments that reveal something both personal and collective.',
    year: '2026',
    cover: 'assets/vico-banner.jpg',
    hero: 'assets/vico-005.jpg',
    images: ['assets/vico-007.jpg', 'assets/vico-002.jpg', 'assets/vico-003.jpg', 'assets/vico-004.jpg', 'assets/vico-005.jpg', 'assets/vico-001.jpg', 'assets/vico-006.jpg'],
  },
  {
    id: 'close',
    title: 'Close',
    subtitle: 'Shot at a monument by Oscar Niemeyer, this series finds its tension in the encounter between body and architecture, two languages of form in quiet conversation. The pieces worn are from the photographer\'s own family archive, styled by him. There\'s an intimacy to that, clothes that carry history, worn as if for the first time. Geometry here isn\'t cold. It frames, it holds, it gives the figure somewhere to exist against. The result is a portrait of restraint that never feels empty.',
    year: '2020',
    cover: 'assets/close-banner.jpg',
    hero: 'assets/close-005.jpg',
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
      if (img.naturalHeight > img.naturalWidth) {
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
        <img src="${project.hero ?? project.cover}" alt="${project.title}" loading="lazy"
             style="width:100%;height:100%;object-fit:cover;" />
      </div>
    `;
    grid.appendChild(el);
  });
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
  const year  = document.querySelector('.hero-year');
  setTimeout(() => {
    if (title) title.classList.add('animate');
    if (year)  year.classList.add('animate');
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
  initNavigation();
  initHeroAnimations();
  initRevealImages();
  initImageLoad();
});
