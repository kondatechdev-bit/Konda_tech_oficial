/**
 * Konda Tech - Animated Statistics Counters
 */

export function initCounters() {
  const counters = document.querySelectorAll('.counter-value');
  if (!counters.length) return;

  function animateCounter(counter) {
    const targetAttr = counter.getAttribute('data-target') || '0';
    const target = parseFloat(targetAttr);
    const prefix = counter.getAttribute('data-prefix') || '';
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 seconds
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const hasDecimals = targetAttr.includes('.');
    const decimals = hasDecimals ? targetAttr.split('.')[1].length : 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease-out quad progression
      const currentVal = target * (1 - Math.pow(1 - progress, 2));

      if (hasDecimals) {
        counter.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;
      } else {
        counter.textContent = `${prefix}${Math.floor(currentVal).toLocaleString()}${suffix}`;
      }

      if (frame >= totalFrames) {
        counter.textContent = `${prefix}${hasDecimals ? target.toFixed(decimals) : target.toLocaleString()}${suffix}`;
        clearInterval(timer);
      }
    }, frameRate);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(counter => observer.observe(counter));
  } else {
    counters.forEach(counter => animateCounter(counter));
  }
}

