import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
  constructor() {
    this.lazyImages = $('.lazyload');
    this.siteHeader = $('.site-header');
    this.navElements = $('.primary-nav a');
    this.triggerElement = $('.large-hero__title');
    this.pageSection = $('.page-section');
    this.headerLinks = $('.primary-nav a');
    this.addSmoothScrolling();
    this.createHeaderWaypoint();
    this.createPageSectionWaypoints();
    this.refreshWaypoints();
  }

  refreshWaypoints() {
    this.lazyImages.on('load', function () {
      Waypoint.refreshAll();
    });
  }

  addSmoothScrolling() {
    this.headerLinks.smoothScroll();
  }

  createHeaderWaypoint() {
    const that = this;
    new Waypoint({
      element: this.triggerElement[0],
      handler: (direction) => {
        if (direction == "down") {
          $(that.siteHeader).addClass('site-header--dark');
        } else {
          $(that.siteHeader).removeClass('site-header--dark');
        }
      }
    });
  }

  createPageSectionWaypoints() {
    const that = this;
    this.pageSection.each(function () {
      const currentSection = this;
      new Waypoint({
        element: currentSection,
        handler: function (direction) {
          if (direction == "down") {
            var matchingLink = currentSection.getAttribute("data-nav-link");
          }
          that.headerLinks.removeClass("is-current-link");
          $(matchingLink).addClass("is-current-link");
        },
        offset: "17%"
      });
      new Waypoint({
        element: currentSection,
        handler: function (direction) {
          if (direction == "up") {
            var matchingLink = currentSection.getAttribute("data-nav-link");
          }
          that.headerLinks.removeClass("is-current-link");
          $(matchingLink).addClass("is-current-link");
        },
        offset: "-28%"
      });
    });
  }
}

export default StickyHeader;