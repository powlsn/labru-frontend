<template>
  <div class="foo">
    {{ title }}
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import NavBar from './components/nav-bar.vue';
// import EventsSection from './components/EventsSection.vue';
// import Footer from './components/Footer.vue';
// import { useSmoothScroll } from './composables/use-smooth-scroll';

// useSmoothScroll({ offset: -80 });

const title = ref('Willkommen bei Vue.js!');
const message = ref('Dein Projekt wurde erfolgreich migriert.');
</script>
