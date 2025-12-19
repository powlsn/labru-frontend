// CSS/SCSS Imports
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/css/styles.css'; // Deine eigenen Styles
import './assets/css/vendor.css';
// SVG Sprite registrieren
import 'virtual:svg-icons-register';


// jQuery importieren und global verfügbar machen
import $ from 'jquery';
window.jQuery = window.$ = $;

// Bootstrap JS (benötigt jQuery global)
import 'bootstrap';

// Weitere jQuery-Plugins
import 'jquery-smooth-scroll';
import 'waypoints/lib/jquery.waypoints';

// Polyfills und Libraries
import 'picturefill';
import 'lazysizes';

// Deine eigenen Module
// import './modules/navigation.js';
// import './modules/gallery.js';
// ... etc

// Dein jQuery-Code
$(document).ready(function () {
  console.log('jQuery und Bootstrap sind geladen!');

  // Deine Initialisierung hier

  // Beispiel: Smooth Scroll
  $('a[href^="#"]').smoothScroll({
    speed: 800,
    offset: -80
  });

  // Lazysizes Konfiguration
  window.lazySizesConfig = window.lazySizesConfig || {};
  window.lazySizesConfig.lazyClass = 'lazyload';
});
