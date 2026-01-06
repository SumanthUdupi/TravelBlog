export function setupGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  const items = galleryGrid.querySelectorAll('.gallery-item');

  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(items, index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openLightbox(items, index);
    });
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
  });
}

function openLightbox(items, currentIndex) {
  const lightbox = createLightbox(items, currentIndex);
  document.body.appendChild(lightbox);
  lightbox.showModal();

  setupLightboxNavigation(lightbox, items, currentIndex);
}

function createLightbox(items, currentIndex) {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox-modal';

  const currentItem = items[currentIndex];
  const imgElement = currentItem.querySelector('img') || currentItem.querySelector('.placeholder-img');
  const imgSrc = imgElement?.src || imgElement?.textContent || 'Gallery Image';

  dialog.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
      <div class="lightbox-image-container">
        <img src="${imgSrc}" alt="Gallery image" class="lightbox-image">
      </div>
      <div class="lightbox-counter">
        <span class="current">${currentIndex + 1}</span> / <span class="total">${items.length}</span>
      </div>
      <div class="lightbox-controls">
        <button class="lightbox-prev" aria-label="Previous image">← Previous</button>
        <button class="lightbox-next" aria-label="Next image">Next →</button>
      </div>
    </div>
  `;

  const closeBtn = dialog.querySelector('.lightbox-close');
  closeBtn.addEventListener('click', () => dialog.close());

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dialog.close();
    if (e.key === 'ArrowLeft') dialog.querySelector('.lightbox-prev').click();
    if (e.key === 'ArrowRight') dialog.querySelector('.lightbox-next').click();
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  return dialog;
}

function setupLightboxNavigation(lightbox, items, currentIndex) {
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const img = lightbox.querySelector('.lightbox-image');
  const currentSpan = lightbox.querySelector('.current');
  let activeIndex = currentIndex;

  const updateImage = (index) => {
    const item = items[index];
    const imgElement = item.querySelector('img') || item.querySelector('.placeholder-img');
    const src = imgElement?.src || imgElement?.textContent || 'Gallery Image';
    img.src = src;
    currentSpan.textContent = index + 1;
    activeIndex = index;
  };

  prevBtn.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + items.length) % items.length;
    updateImage(activeIndex);
  });

  nextBtn.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % items.length;
    updateImage(activeIndex);
  });

  img.addEventListener('click', (e) => {
    if (e.clientX < window.innerWidth / 2) {
      prevBtn.click();
    } else {
      nextBtn.click();
    }
  });

  prevBtn.focus();
}

export function setupScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 50);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
  });

  return observer;
}

export function setupImageLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}
