(function() {
  var Bullet;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Bullet = (function() {
    __extends(Bullet, Mantra.Entity);
    function Bullet(game, options) {
      Bullet.__super__.constructor.call(this, game);
      if (options != null) {
        this.setOptions(options);
      }
    }
    Bullet.prototype.setOptions = function(options) {
      var _ref, _ref2, _ref3, _ref4;
      _ref = [options.x, options.y], this.x = _ref[0], this.y = _ref[1];
      this.angle = options.angle;
      this.speed = (_ref2 = options.speed) != null ? _ref2 : options.speed = 250;
      this.radial_distance = (_ref3 = options.radial_distance) != null ? _ref3 : options.radial_distance = 95;
      this.explodesAt = options.explodesAt;
      if (options.explode != null) {
        this.explode = options.explode;
      }
      _.defaults(options, {
        explodeWhen: function() {
          return Math.abs(this.x) >= Math.abs(this.explodesAt.x) || Math.abs(this.y) >= Math.abs(this.explodesAt.y);
        }
      });
      this.explodeWhen = options.explodeWhen;
      return this.auto_cull = (_ref4 = options.auto_cull) != null ? _ref4 : options.auto_cull = false;
    };
    Bullet.prototype.update = function() {
      if (this.auto_cull && this.outsideScreen()) {
        return this.remove_from_world = true;
      }
      if (this.explodeWhen()) {
        return this.explode();
      }
      this.move();
      return Bullet.__super__.update.call(this);
    };
    Bullet.prototype.move = function() {
      this.x = this.radial_distance * Math.cos(this.angle);
      this.y = this.radial_distance * Math.sin(this.angle);
      return this.radial_distance += this.speed * this.game.clock_tick;
    };
    Bullet.prototype.explode = function() {
      return this.remove_from_world = true;
    };
    return Bullet;
  })();
  root.Bullet = Bullet;
}).call(this);
