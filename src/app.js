import { createApp } from 'vue';
import App from './app.vue';

// Styles importieren
// import 'normalize.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import '@fortawesome/fontawesome-free/css/all.css';
// import '../styles/main.scss';

// SVG Sprite registrieren
// import 'virtual:svg-icons-register';

// Vue App erstellen und mounten
const app = createApp(App);

app.mount('#app');
