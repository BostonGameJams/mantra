(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Mantra.Defender = (function() {
    __extends(Defender, Mantra.Entity);
    function Defender(game, radius) {
      var _ref, _ref2;
      this.radius = radius != null ? radius : 16;
      Defender.__super__.constructor.call(this, game, null, 0);
      this.speed = 5;
      _ref = [16, 16], this.colx = _ref[0], this.coly = _ref[1];
      _ref2 = [32, 32], this.colw = _ref2[0], this.colh = _ref2[1];
    }
    Defender.prototype.update = function() {
      Mantra.Controls.moveByKeys.call(this);
      if (this.game.click) {
        this.shoot();
      }
      return this.game.map.tileCollision(this);
    };
    Defender.prototype.draw = function(context) {
      Mantra.Canvas.circle(context, {
        x: this.x,
        y: this.y,
        radius: this.radius,
        style: 'rgba(100, 200, 20, .8)'
      });
      if (this.game.draw_collision_boxes) {
        return Mantra.Canvas.rectangle(context, {
          x: this.x - this.colx,
          y: this.y - this.coly,
          w: this.radius * 2,
          h: this.radius * 2,
          hollow: true,
          style: 'white'
        });
      }
    };
    Defender.prototype.setCoords = function(coords) {
      this.x = coords.x;
      return this.y = coords.y;
    };
    Defender.prototype.shoot = function() {
      this.game.screens.game.add(new EBF.DefenderBullet(this.game, {
        x: this.x,
        y: this.y,
        angle: Math.atan2(this.game.mouse.y - this.y, this.game.mouse.x - this.x),
        radial_offset: this.radius + 3
      }));
      return AssetManager.playSound('bullet_shot');
    };
    return Defender;
  })();
}).call(this);
