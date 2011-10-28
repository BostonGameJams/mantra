(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Mantra.MapEntity = (function() {
    __extends(MapEntity, Mantra.Entity);
    function MapEntity(game, options) {
      var _ref;
      this.options = options;
      _ref = [options.x, options.y, options.w, options.h, options.style], this.x = _ref[0], this.y = _ref[1], this.w = _ref[2], this.h = _ref[3], this.style = _ref[4];
      MapEntity.__super__.constructor.call(this, game, {
        x: this.x,
        y: this.y
      });
    }
    MapEntity.prototype.draw = function(context) {
      Mantra.Canvas.rectangle(context, {
        x: this.x,
        y: this.y,
        w: this.w,
        h: this.h,
        style: this.style || 'rgba(173, 216, 230, 1.0)'
      });
      Mantra.Canvas.rectangle(context, {
        x: this.x + 1,
        y: this.y + 1,
        w: this.w - 2,
        h: this.h - 2,
        style: 'rgba(0, 0, 0, 0.5)',
        hollow: true,
        borderWidth: 2
      });
      return Mantra.Canvas.rectangle(context, {
        x: this.x + 5,
        y: this.y + 5,
        w: this.w - 10,
        h: this.h - 10,
        hollow: true,
        borderWidth: 2
      });
    };
    MapEntity.prototype.setCoords = function(coords) {
      this.x = coords.x;
      return this.y = coords.y;
    };
    return MapEntity;
  })();
}).call(this);
