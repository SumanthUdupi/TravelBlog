export function setupNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = mainNav?.querySelectorAll('a');

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('open');
    document.body.style.overflow = !isExpanded ? 'hidden' : 'auto';
  });

  navLinks?.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = 'auto';
    });

    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        link.click();
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
      if (mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = 'auto';
      menuToggle.focus();
    }
  });
}

export function setupBreadcrumb(items) {
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');
  nav.className = 'breadcrumb';

  const ol = document.createElement('ol');

  items.forEach((item, index) => {
    const li = document.createElement('li');

    if (index === items.length - 1) {
      li.setAttribute('aria-current', 'page');
      li.textContent = item.label;
    } else {
      const a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.label;
      li.appendChild(a);
    }

    ol.appendChild(li);
  });

  nav.appendChild(ol);
  return nav;
}

export function setupProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

export function setupHeaderSticky() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove('hidden');
    } else if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    lastScroll = currentScroll;
  });
}

export function setupSkipLink() {
  const skipLink = document.querySelector('.skip-link');
  if (!skipLink) return;

  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById('main-content');
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
