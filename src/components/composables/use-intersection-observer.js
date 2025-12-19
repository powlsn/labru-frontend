import { ref, onMounted, onUnmounted } from 'vue';

export function useIntersectionObserver(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true
  } = options;

  const isVisible = ref(false);
  const target = ref(null);
  let observer = null;

  const callback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true;

        if (once && observer) {
          observer.disconnect();
        }
      } else if (!once) {
        isVisible.value = false;
      }
    });
  };

  onMounted(() => {
    if (!target.value) return;

    observer = new IntersectionObserver(callback, {
      threshold,
      rootMargin
    });

    observer.observe(target.value);
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    target,
    isVisible
  };
}
