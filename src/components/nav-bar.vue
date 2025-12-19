<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">Labru</a>

      <button 
        class="navbar-toggler" 
        type="button"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div 
        class="collapse navbar-collapse" 
        :class="{ show: isMenuOpen }"
      >
        <ul class="navbar-nav ms-auto">
          <li 
            v-for="item in menuItems" 
            :key="item.id"
            class="nav-item"
          >
            <a 
              class="nav-link" 
              :href="item.href"
              @click="handleNavClick"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const menuItems = ref([
  { id: 1, label: 'Home', href: '#home' },
  { id: 2, label: 'Über uns', href: '#about' },
  { id: 3, label: 'Events', href: '#events' },
  { id: 4, label: 'Kontakt', href: '#contact' }
]);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleNavClick = (event) => {
  const href = event.target.getAttribute('href');
  
  if (href.startsWith('#')) {
    event.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    isMenuOpen.value = false;
  }
};
</script>
