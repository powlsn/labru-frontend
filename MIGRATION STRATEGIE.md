# Strategischer Migrations-Plan
Phase 1: Vue.js Setup parallel zu jQuery
Zuerst bauen wir Vue.js neben jQuery auf, sodass beide koexistieren können.
1. Vue.js installieren:
```
  bashnpm install vue@3
  npm install -D @vitejs/plugin-vue
```
2. Vite-Config für Vue erweitern:vite.config.jsCode ∙ Version 6 `import { defineConfig } from 'vite';`
```
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { revite.config.jsCode ∙ Version 7   plugins: [
    vue(), // Vue Plugin an erster Stelle
    globalLibrariesPlugin(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    // SVG Sprite Generator
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/asse3. Vue-App Setup erstellen:src/app.js (Vue Entry Point)Code import { createApp } from 'vue';
import App from './App.vue';

// Styles importieren
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/main.scss';

// SVG Sprite re4. Root Vue-Komponente erstellen:src/App.vueCode <template>
  <div id="app">
    <!-- Hier kommen deine Vue-Komponenten rein -->
    <Navigation />

    <main class="container mt-5">
      <h1>{{ title }}</h1>
      <p>{{ message }}</p>

      <!-- Alte jQuery-Bereiche können erstmal als 5. HTML für Vue anpassen:index.htmlInteraktives Artefakt ∙ Version 3 Phase 2: Komponentenstruktur aufbauen
```
# Erstelle eine sinnvolle Ordnerstruktur:
src/
├── app.js              # Vue Entry Point
├── App.vue             # Root Component
├── components/
│   ├── Navigation.vue
│   ├── EventsSection.vue
│   ├── Footer.vue
│   └── shared/
│       ├── Icon.vue
│       └── LazyImage.vue
├── composables/        # Vue 3 Composition API Logic
│   ├── useScrolling.js
│   └── useLazyLoad.js
├── assets/
│   ├── images/
│   └── fonts/
└── styles/
    ├── main.scss
    └── modules/

# Phase 3: Beispiel-Komponenten
Icon-Komponente (SVG Sprites in Vue):src/components/shared/Icon.vueCode 
```
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
    Verwendung:
vue<Icon name="map-pin" size="large" />
Navigation-Komponente:src/components/Navigation.vueCode <template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">Labru</a>
      
      <button 
        class="navbar-toggler" 
        type="button"
        @click="toggleMeLazy-Loading Image Komponente:src/components/shared/LazyImage.vueCode <template>
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
```
# Phase 4: jQuery zu Vue migrieren - Schritt für Schritt
## Migrations-Prioritäten:

Start mit einfachen Komponenten:

Navigation
Footer
Statische Sektionen


## Dann interaktive Elemente:

Formulare
Modals
Accordions


## Zuletzt komplexe Features:

Animationen
Waypoints → Vue Intersection Observer
Smooth Scroll → Native oder Vue-Router



# Phase 5: jQuery-Funktionalität ersetzen
jQuery Smooth Scroll → Vue Composable:src/composables/useSmoothScroll.jsCode 

```
import { onMounted, onUnmounted } from 'vue';

export function useSmoothScroll(options = {}) {
  const {
    offset = -80,
    duration = 800
  } = options;

  const handleClick = (event) => {
    const target = event.target.closest('a[href^="#"]');
```

## Verwendung in App.vue:
```
<script setup>
import { useSmoothScroll } from './composables/useSmoothScroll';

useSmoothScroll({ offset: -80 });
</script>
Waypoints → Intersection Observer Composable:src/composables/useIntersectionObserver.jsCode import { ref, onMounted, onUnmounted } from 'vue';

export function useIntersectionObserver(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true
  } = options;

  const isVisible = ref(false);
  const target = ref(nuVerwendung in einer Komponente:
vue<template>
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
```

# Phase 6: Bootstrap in Vue
Für Bootstrap in Vue gibt es zwei Optionen:
Option A: BootstrapVue 3 (Empfohlen)
bashnpm install bootstrap-vue-next
Option B: Vanilla Bootstrap behalten (erstmal einfacher)

Bootstrap CSS behalten
JavaScript-Features nach Bedarf in Vue reimplementieren

Migrations-RoadmapMIGRATION_ROADMAP.mdDokument # jQuery zu Vue.js Migrations-Roadmap

## Phase 1: Setup ✓
- [x] Vue.js installieren
- [x] Vite-Config anpassen
- [x] Vue Entry Point erstellen
- [x] Basis-Komponenten-Struktur

## Phase 2: Basis-Komponenten (Woche 1-2)
- [ ] Navigation-Komponente
- Empfohlene Vorgehensweise
1. Parallel-Ansatz (Sicherer):

Behalte jQuery erstmal
Baue neue Features in Vue
Migriere alte Features Stück für Stück
Entferne jQuery am Ende

2. Big-Bang-Ansatz (Schneller, risikoreicher):

Stoppe Feature-Development
Migriere alles auf einmal
Teste intensiv

Ich empfehle den Parallel-Ansatz!
Nächste konkrete Schritte

Heute: Vue Setup wie oben beschrieben
Diese Woche: Navigation + Footer in Vue umbauen
Nächste Woche: Eine Sektion (z.B. Events) komplett in Vue
Dann: Iterativ weitere Bereiche migrieren

Möchtest du mit einer spezifischen Komponente starten? Zeig mir gerne ein Stück deines aktuellen jQuery-Codes, dann helfe ich dir, es in Vue umzusetzen!
