(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  EBF.DefenderBullet = (function() {
    __extends(DefenderBullet, Bullet);
    function DefenderBullet(game, options) {
      this.options = options;
      DefenderBullet.__super__.constructor.call(this, game);
      this.setOptions({
        radial_distance: 0,
        angle: this.options.angle,
        speed: 200,
        explodeWhen: Mantra.Timer.after(this, {
          milliseconds: 1250
        })
      });
      _.defaults(this.options, {
        size: 4
      });
      this.shotFrom = {
        x: this.options.x,
        y: this.options.y
      };
      this.firedAt = Date.now();
      this.radial_offset = this.options.radial_offset;
    }
    DefenderBullet.prototype.draw = function(context) {
      Mantra.Canvas.rectangle(context, {
        x: this.x,
        y: this.y,
        w: this.options.size,
        h: this.options.size,
        style: 'rgba(240, 240, 240, 1)'
      });
      Mantra.Canvas.rectangle(context, {
        x: this.x + 1,
        y: this.y - 1,
        w: 2,
        h: 2,
        style: 'white'
      });
      Mantra.Canvas.rectangle(context, {
        x: this.x + 1,
        y: this.y + this.options.size / 2 + 1,
        w: 2,
        h: 2,
        style: 'white'
      });
      Mantra.Canvas.rectangle(context, {
        x: this.x + this.options.size / 2 + 2,
        y: this.y + 1,
        w: 1,
        h: 2,
        style: 'white'
      });
      return Mantra.Canvas.rectangle(context, {
        x: this.x - 1,
        y: this.y + 1,
        w: 1,
        h: 2,
        style: 'white'
      });
    };
    DefenderBullet.prototype.move = function() {
      var starting_distance;
      starting_distance = this.radial_offset + this.radial_distance;
      this.x = this.shotFrom.x + (starting_distance * Math.cos(this.angle));
      this.y = this.shotFrom.y + (starting_distance * Math.sin(this.angle));
      return this.radial_distance += this.speed * this.game.clock_tick;
    };
    return DefenderBullet;
  })();
}).call(this);
