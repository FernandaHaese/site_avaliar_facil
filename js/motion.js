(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compactScreen = window.matchMedia('(max-width: 600px)');

  // Progressive enhancement: content remains visible without animation support.
  if (reducedMotion.matches || !('IntersectionObserver' in window) ||
      !('animate' in Element.prototype)) return;

  const elements = [...document.querySelectorAll([
    '.hero-copy > *', '.hero-visual', '.section-heading > *',
    '.benefit-card', '.system-copy', '.monitor-demo', '.report-paper',
    '.cta-card > *', '.footer-inner > *', '.news-card',
  ].join(','))];
  const animations = new Map();
  let observer;

  function reveal(element, immediate = false) {
    observer?.unobserve(element);
    const pending = element.classList.contains('motion-pending');
    element.classList.remove('motion-pending');
    if (immediate) {
      animations.get(element)?.cancel();
      animations.delete(element);
      return;
    }
    if (!pending || reducedMotion.matches) return;

    const siblings = elements.filter(item => item.parentElement === element.parentElement);
    const delay = Math.min(siblings.indexOf(element), 2) * (compactScreen.matches ? 40 : 80);
    const distance = compactScreen.matches ? 10 : 20;
    const animation = element.animate([
      { opacity: 0, transform: `translateY(${distance}px)` },
      { opacity: 1, transform: 'translateY(0)' },
    ], {
      duration: compactScreen.matches ? 400 : 500,
      delay,
      easing: 'ease-out',
      // Apply the first frame during the delay, then restore normal hover styles.
      fill: 'backwards',
    });
    animations.set(element, animation);
    animation.onfinish = () => animations.delete(element);
  }

  function stopMotion() {
    observer?.disconnect();
    elements.forEach(element => reveal(element, true));
  }

  try {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

    elements.forEach(element => {
      // Keep already-passed content visible on restored scroll positions.
      if (element.getBoundingClientRect().bottom <= 0) return;
      element.classList.add('motion-pending');
      observer.observe(element);
    });
  } catch {
    stopMotion();
  }

  // Keyboard navigation must never land on a hidden or moving control.
  document.addEventListener('focusin', event => {
    elements.forEach(element => {
      if (element.contains(event.target)) reveal(element, true);
    });
  });

  reducedMotion.addEventListener('change', event => {
    if (event.matches) stopMotion();
  });
  window.addEventListener('beforeprint', stopMotion);
  window.addEventListener('pageshow', event => {
    if (event.persisted) stopMotion();
  });
})();
