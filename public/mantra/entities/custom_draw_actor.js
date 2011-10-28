(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Mantra.CustomDrawEntity = (function() {
    __extends(CustomDrawEntity, SpriteEntity);
    function CustomDrawEntity(game, position) {
      CustomDrawEntity.__super__.constructor.call(this, game, null, position);
    }
    return CustomDrawEntity;
  })();
}).call(this);
