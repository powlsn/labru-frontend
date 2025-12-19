<template>
  <div 
    ref="target" 
    :class="{ 'animate-in': isVisible }"
  >
    Content wird animiert wenn sichtbar
  </div>
</template>

<script setup>
import { useIntersectionObserver } from '@/composables/useIntersectionObserver';

const { target, isVisible } = useIntersectionObserver({
  threshold: 0.5,
  once: true
});
</script>
