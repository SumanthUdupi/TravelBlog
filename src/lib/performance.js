/**
 * Performance Optimization Utilities
 * Handles metrics, caching, and optimization strategies
 */

export class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observing = false;
  }

  init() {
    if (this.observing) return;

    this.observing = true;

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.notifyAppUpdate();
              }
            });
          });
        })
        .catch((error) => {
          console.warn('Service Worker registration failed:', error);
        });
    }

    // Monitor Core Web Vitals
    this.monitorCoreWebVitals();

    // Optimize images
    this.optimizeImages();

    // Setup resource hints
    this.setupResourceHints();
  }

  monitorCoreWebVitals() {
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.LCP = lastEntry.renderTime || lastEntry.loadTime;
          console.log('LCP:', this.metrics.LCP);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observation not supported');
      }

      // First Input Delay (FID) / Interaction to Next Paint (INP)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            this.metrics.FID = entry.processingDuration;
            console.log('FID:', this.metrics.FID);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observation not supported');
      }

      // Cumulative Layout Shift (CLS)
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          list.getEntries().forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.metrics.CLS = clsValue;
          console.log('CLS:', this.metrics.CLS);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observation not supported');
      }
    }

    // Paint Timing
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach((entry) => {
      this.metrics[entry.name] = entry.startTime;
      console.log(`${entry.name}: ${entry.startTime}ms`);
    });
  }

  optimizeImages() {
    const images = document.querySelectorAll('img:not([loading="lazy"])');

    images.forEach((img) => {
      // Add loading="lazy" for images below the fold
      if (!img.loading) {
        img.loading = 'lazy';
      }

      // Use native lazy loading with fallback
      if ('loading' in HTMLImageElement.prototype) {
        img.loading = 'lazy';
      } else {
        // Fallback to Intersection Observer
        this.lazyLoadImage(img);
      }

      // Optimize image format
      const src = img.src;
      if (src && !src.includes('.webp')) {
        const webpSrc = src.replace(/\.(jpg|png)$/i, '.webp');
        const picture = document.createElement('picture');
        const source = document.createElement('source');
        source.srcset = webpSrc;
        source.type = 'image/webp';
        picture.appendChild(source);
        picture.appendChild(img.cloneNode(true));
        img.parentNode.replaceChild(picture, img);
      }
    });
  }

  lazyLoadImage(img) {
    if (!('IntersectionObserver' in window)) {
      img.src = img.dataset.src || img.src;
      return;
    }

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src || image.src;
          imageObserver.unobserve(image);
        }
      });
    });

    imageObserver.observe(img);
  }

  setupResourceHints() {
    const head = document.head;

    // DNS Prefetch for external domains
    const dnsPrefetchDomains = ['fonts.googleapis.com', 'fonts.gstatic.com'];
    dnsPrefetchDomains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      head.appendChild(link);
    });

    // Preconnect for critical third-party origins
    const preconnectDomains = ['fonts.googleapis.com', 'fonts.gstatic.com'];
    preconnectDomains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = `//${domain}`;
      head.appendChild(link);
    });
  }

  getMetrics() {
    return this.metrics;
  }

  reportMetrics() {
    console.log('Performance Metrics:', this.metrics);
    return this.metrics;
  }

  notifyAppUpdate() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
      <div class="update-message">
        A new version is available.
        <button id="update-btn">Refresh</button>
      </div>
    `;

    document.body.appendChild(notification);

    document.getElementById('update-btn').addEventListener('click', () => {
      window.location.reload();
    });
  }
}

// Cache management utilities
export class CacheManager {
  static async clearOldCaches() {
    const currentCacheName = `sacred-odyssey-v1`;

    const cacheNames = await caches.keys();
    return Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName !== currentCacheName) {
          return caches.delete(cacheName);
        }
      })
    );
  }

  static async cacheAssets(urls) {
    const cacheName = 'sacred-odyssey-v1';
    const cache = await caches.open(cacheName);
    return cache.addAll(urls);
  }

  static async getCachedAsset(url) {
    const cache = await caches.open('sacred-odyssey-v1');
    return cache.match(url);
  }
}

// Debounce utility for performance
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility for performance
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// RequestIdleCallback polyfill
export function scheduleIdleWork(callback) {
  if ('requestIdleCallback' in window) {
    return requestIdleCallback(callback);
  }
  return setTimeout(callback, 1);
}

// Intersection Observer helper
export function observeElements(selector, callback, options = {}) {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);

  document.querySelectorAll(selector).forEach((el) => {
    observer.observe(el);
  });

  return observer;
}

// Initialize performance monitoring
const monitor = new PerformanceMonitor();
export default monitor;
