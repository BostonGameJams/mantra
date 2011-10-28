(function() {
  Mantra.Entity = (function() {
    function Entity(game, coords) {
      var _ref;
      this.game = game;
      if (coords == null) {
        coords = {
          x: 0,
          y: 0
        };
      }
      _ref = [coords.x, coords.y], this.x = _ref[0], this.y = _ref[1];
      this.remove_from_world = false;
      this.screen = null;
      this.timers = [];
    }
    Entity.prototype.update = function() {};
    Entity.prototype.draw = function() {
      return null;
    };
    Entity.prototype.cull = function() {
      return null;
    };
    Entity.prototype.addTimer = function(timer) {
      return this.timers.push(timer);
    };
    Entity.prototype.outsideScreen = function() {
      if (this.game.center_coordinates) {
        return this.x > this.game.halfSurfaceWidth || this.x < -this.game.halfSurfaceWidth || this.y > this.game.halfSurfaceHeight || this.y < -this.game.halfSurfaceHeight;
      } else {
        return this.x > this.game.canvas.width || this.x < -this.game.canvas.width || this.y > this.game.canvas.height || this.y < -this.game.canvas.height;
      }
    };
    Entity.prototype.listen = function(type, callback) {
      return Mantra.EventManager.instance.listen(type, this, callback);
    };
    Entity.prototype.s_coords = function() {
      return "" + (this.x.toString().slice(0, 6)) + ", " + (this.y.toString().slice(0, 6));
    };
    Entity.prototype.drawSpriteCentered = function(context) {
      var x, y;
      if (this.sprite == null) {
        return;
      }
      x = this.x - this.sprite.width / 2;
      y = this.y - this.sprite.height / 2;
      return context.drawImage(this.sprite, x, y);
    };
    Entity.prototype.setCoords = function(coords) {
      this.x = coords.x;
      return this.y = coords.y;
    };
    return Entity;
  })();
}).call(this);
