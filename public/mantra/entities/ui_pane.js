(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __slice = Array.prototype.slice;
  Mantra.UIPane = (function() {
    __extends(UIPane, EntitySet);
    function UIPane(game, options) {
      this.game = game;
      this.options = options != null ? options : {};
      UIPane.__super__.constructor.apply(this, [this.game].concat(__slice.call(this.options.entities || [])));
      this.pane = true;
    }
    UIPane.prototype.addElement = function(draw_func) {
      var entity;
      entity = new Mantra.Entity(this.game);
      entity.draw = function(context) {
        return draw_func.apply(this, [context]);
      };
      return this.add(entity);
    };
    UIPane.prototype.addText = function(text_draw) {
      return this.addElement(function(context) {
        context.fillStyle = 'red';
        context.font = 'bold 2em Arial';
        return text_draw();
      });
    };
    UIPane.prototype.addTextItem = function(text_item) {
      return this.addElement(function(context) {
        var text;
        context.fillStyle = text_item.color || 'red';
        context.font = text_item.font || 'bold 2em Arial';
        text = text_item.text.apply(this);
        if (text_item.x === 'centered' && !this.game.center_coordinates) {
          text_item.x = this.game.canvas.width / 2 - Math.round(context.measureText(text).width) / 2;
        }
        if (text_item.x === 'centered' && this.game.center_coordinates) {
          text_item.x = -Math.round(context.measureText(text).width) / 2;
        }
        if (text_item.y === 'centered' && !this.game.center_coordinates) {
          text_item.y = this.game.canvas.height / 2;
        }
        if (text_item.y === 'centered' && this.game.center_coordinates) {
          text_item.y = -8;
        }
        return context.fillText(text, text_item.x, text_item.y);
      });
    };
    return UIPane;
  })();
}).call(this);
