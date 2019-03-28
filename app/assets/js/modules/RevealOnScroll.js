import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
  constructor(item, offset) {
    this.itemsToReveal = item;
    this.hideInitially();
    this.createWaypoints(offset);
  }

  hideInitially() {
    this.itemsToReveal.addClass("reveal-item");
  }

  createWaypoints(_offset) {
    this.itemsToReveal.each(function () {
      var _this = this;
      new Waypoint({
        element: _this,
        handler: function (direction) {
          console.log(this.element.id + ' hit the 100% mark');
          $(_this).addClass("reveal-item--is-visible");
        },
        offset: _offset
      });
    });
  }

}

export default RevealOnScroll;