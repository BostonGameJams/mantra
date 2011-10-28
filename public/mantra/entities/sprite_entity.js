(function() {
  var SpriteEntity;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  SpriteEntity = (function() {
    __extends(SpriteEntity, Mantra.Entity);
    function SpriteEntity(game, sprite, coords) {
      this.game = game;
      this.sprite = sprite;
      if (coords == null) {
        coords = {
          x: 0,
          y: 0
        };
      }
      this.setCoords(coords);
      this.remove_from_world = false;
    }
    SpriteEntity.prototype.draw = function(context) {
      if (this.game.showOutlines && this.radius) {
        context.beginPath();
        context.strokeStyle = 'green';
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        return context.closePath();
      }
    };
    SpriteEntity.prototype.drawSpriteCenteredRotated = function(context) {
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.angle + Math.PI / 2);
      context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
      return context.restore();
    };
    return SpriteEntity;
  })();
  root.SpriteEntity = SpriteEntity;
}).call(this);
