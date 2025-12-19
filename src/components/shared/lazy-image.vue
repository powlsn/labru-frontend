<template>
  <img 
    ref="imageRef"
    :data-src="src"
    :alt="alt"
    :class="['lazyload', imageClass]"
    @load="onLoad"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  imageClass: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['loaded']);

const imageRef = ref(null);
const isLoaded = ref(false);

const onLoad = () => {
  isLoaded.value = true;
  emit('loaded');
};

// Optional: Native Lazy Loading als Fallback
onMounted(() => {
  if ('loading' in HTMLImageElement.prototype) {
    imageRef.value.loading = 'lazy';
  }
});
</script>
