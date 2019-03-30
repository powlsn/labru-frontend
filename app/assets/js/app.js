import $ from 'jquery';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';

const mm = new MobileMenu();
const galleryItemScroll = new RevealOnScroll($(".card-columns__card"), "60%");
const stickyHeader = new StickyHeader();