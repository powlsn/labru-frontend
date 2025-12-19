import { onMounted, onUnmounted } from 'vue';

export function useSmoothScroll(options = {}) {
  const {
    offset = -80,
    duration = 800
  } = options;

  const handleClick = (event) => {
    const target = event.target.closest('a[href^="#"]');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href || href === '#') return;

    event.preventDefault();

    const element = document.querySelector(href);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  onMounted(() => {
    document.addEventListener('click', handleClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClick);
  });

  return {
    scrollTo: (selector) => {
      const element = document.querySelector(selector);
      if (element) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };
}
