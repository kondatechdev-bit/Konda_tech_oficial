/**
 * Konda Tech - Touch & Mouse Manual Interactive Slider
 */

export function initSliders() {
  const sliders = document.querySelectorAll('.slider-container');

  sliders.forEach(slider => {
    const track = slider.querySelector('.slider-track');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dots = slider.querySelectorAll('.slider-dot');

    if (!track) return;

    let currentIndex = 0;
    const slides = track.children;
    const totalSlides = slides.length;
    let autoplayTimer = null;

    function updateSlider(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;

      currentIndex = index;
      const offset = -currentIndex * 100;
      track.style.transform = `translateX(${offset}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        updateSlider(currentIndex + 1);
      }, 5000);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    prevBtn?.addEventListener('click', () => {
      updateSlider(currentIndex - 1);
      startAutoplay();
    });

    nextBtn?.addEventListener('click', () => {
      updateSlider(currentIndex + 1);
      startAutoplay();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        updateSlider(i);
        startAutoplay();
      });
    });

    // Touch & Drag Support
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          updateSlider(currentIndex + 1);
        } else {
          updateSlider(currentIndex - 1);
        }
      }
      isDragging = false;
      startAutoplay();
    }, { passive: true });

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    // Initial start
    startAutoplay();
  });
}

