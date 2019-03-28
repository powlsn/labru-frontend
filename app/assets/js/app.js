import $ from 'jquery';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';

const mm = new MobileMenu();
const galleryItemScroll = new RevealOnScroll($(".card-columns__card"), "60%");