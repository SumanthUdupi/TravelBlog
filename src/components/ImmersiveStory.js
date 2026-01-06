export function setupImmersiveTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach((item, index) => {
    item.setAttribute('data-index', index);
    item.addEventListener('click', () => revealTimeline(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') revealTimeline(item);
    });
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.3 });

  timelineItems.forEach(item => observer.observe(item));
}

function revealTimeline(item) {
  item.classList.toggle('expanded');
  const content = item.querySelector('.timeline-content');

  if (item.classList.contains('expanded')) {
    content.style.maxHeight = content.scrollHeight + 'px';
  } else {
    content.style.maxHeight = '0';
  }
}

export function setupNarrativeProgression() {
  const sections = document.querySelectorAll('section[id]');
  const narrativeGuide = createNarrativeGuide();

  document.body.appendChild(narrativeGuide);

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateNarrativeProgress(entry.target.id, narrativeGuide);
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => sectionObserver.observe(section));
}

function createNarrativeGuide() {
  const guide = document.createElement('aside');
  guide.className = 'narrative-guide';
  guide.setAttribute('aria-label', 'Journey progress');

  guide.innerHTML = `
    <div class="guide-content">
      <h3>Your Sacred Journey</h3>
      <div class="progress-steps">
        <div class="step" data-step="hero">The Call</div>
        <div class="step" data-step="intro">The Greeting</div>
        <div class="step" data-step="timeline">The Path</div>
        <div class="step" data-step="sacred-beginning">Sacred Ground</div>
        <div class="step" data-step="mountain-paths">Mountain Trails</div>
        <div class="step" data-step="revelation">Revelation</div>
        <div class="step" data-step="return">Return Home</div>
      </div>
    </div>
  `;

  return guide;
}

function updateNarrativeProgress(sectionId, guide) {
  const steps = guide.querySelectorAll('.step');
  steps.forEach(step => {
    if (step.dataset.step === sectionId) {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    }
  });
}

export function setupEmotionalHooks() {
  const hookElements = document.querySelectorAll('[data-emotion]');

  hookElements.forEach(element => {
    const emotion = element.dataset.emotion;
    element.addEventListener('mouseenter', () => {
      element.classList.add(`emotion-${emotion}`);
    });
  });
}

export function setupContextualReveals() {
  const reveals = document.querySelectorAll('[data-reveal-trigger]');

  reveals.forEach(element => {
    const trigger = element.dataset.revealTrigger;
    const target = document.querySelector(`[data-reveal-content="${trigger}"]`);

    if (target) {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        target.classList.toggle('revealed');

        if (target.classList.contains('revealed')) {
          target.style.maxHeight = target.scrollHeight + 'px';
        } else {
          target.style.maxHeight = '0';
        }
      });

      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') element.click();
      });

      element.setAttribute('role', 'button');
      element.setAttribute('tabindex', '0');
    }
  });
}

export function setupParallaxEffect() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length === 0) return;

  window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
      const scrollPosition = window.pageYOffset;
      const speed = element.dataset.parallax || 0.5;

      element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  });
}

export function setupAmbientNarrative() {
  const narrativeMarkers = document.querySelectorAll('[data-narrative]');

  const narrativeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = entry.target.dataset.narrative;
        showNarrativeBubble(text);
      }
    });
  }, { threshold: 0.5 });

  narrativeMarkers.forEach(marker => narrativeObserver.observe(marker));
}

function showNarrativeBubble(text) {
  const bubble = document.createElement('div');
  bubble.className = 'narrative-bubble';
  bubble.textContent = text;

  document.body.appendChild(bubble);

  setTimeout(() => {
    bubble.classList.add('visible');
  }, 100);

  setTimeout(() => {
    bubble.classList.remove('visible');
    setTimeout(() => bubble.remove(), 300);
  }, 3000);
}
