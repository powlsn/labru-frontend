# jQuery zu Vue.js Migrations-Roadmap

## Phase 1: Setup ✓
- [x] Vue.js installieren
- [x] Vite-Config anpassen
- [x] Vue Entry Point erstellen
- [x] Basis-Komponenten-Struktur

## Phase 2: Basis-Komponenten (Woche 1-2)
- [ ] Navigation-Komponente
- [ ] Footer-Komponente
- [ ] Icon-Komponente
- [ ] LazyImage-Komponente
- [ ] Button-Komponente

## Phase 3: Seiten-Sektionen (Woche 3-4)
- [ ] Hero/Header Sektion
- [ ] Events Sektion
- [ ] About Sektion
- [ ] Kontakt Sektion

## Phase 4: Interaktive Features (Woche 5-6)
- [ ] Formulare (Vue Reactivity)
- [ ] Smooth Scrolling (Composable)
- [ ] Waypoints → Intersection Observer
- [ ] Modal/Overlay-Komponenten
- [ ] Accordion/Toggle-Komponenten

## Phase 5: Optimierung (Woche 7)
- [ ] Lazy Loading Images optimieren
- [ ] Code Splitting
- [ ] Performance-Tests
- [ ] jQuery komplett entfernen

## jQuery → Vue Mapping

### Navigation
```javascript
// jQuery
$('.navbar-toggler').on('click', function() {
  $('.navbar-collapse').toggleClass('show');
});

// Vue
const isOpen = ref(false);
const toggle = () => isOpen.value = !isOpen.value;
```

### Smooth Scroll
```javascript
// jQuery
$('a[href^="#"]').smoothScroll({ speed: 800 });

// Vue
useSmoothScroll({ duration: 800 });
```

### Waypoints/Scroll-Animationen
```javascript
// jQuery + Waypoints
$('.element').waypoint(function() {
  $(this.element).addClass('animate-in');
});

// Vue + Intersection Observer
const { target, isVisible } = useIntersectionObserver();
```

### Event Delegation
```javascript
// jQuery
$(document).on('click', '.button', handler);

// Vue
<button @click="handler">Click</button>
```

## Tipps

1. **Inkrementell migrieren:** Nicht alles auf einmal
2. **Component-first denken:** Jedes UI-Element = Komponente
3. **Composables nutzen:** Wiederverwendbare Logik
4. **Props & Events:** Komponenten-Kommunikation
5. **TypeScript erwägen:** Für größere Projekte
