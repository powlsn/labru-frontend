<template>
  <svg :class="iconClasses">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value)
  }
});

const iconClasses = computed(() => [
  'icon',
  `icon--${props.name}`,
  props.size !== 'medium' ? `icon--${props.size}` : ''
]);
</script>

<style scoped>
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
  flex-shrink: 0;
}

.icon--small {
  width: 0.875em;
  height: 0.875em;
}

.icon--large {
  width: 1.5em;
  height: 1.5em;
}

.icon--xlarge {
  width: 2em;
  height: 2em;
}
</style>
