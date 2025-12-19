import $ from 'jquery';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import ContactAjax from './modules/ContactAJAX';

const mm = new MobileMenu();
const galleryItemScroll = new RevealOnScroll($(".card"), "70%");
const stickyHeader = new StickyHeader();
const contact = new ContactAjax();