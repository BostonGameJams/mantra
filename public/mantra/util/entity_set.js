(function() {
  var EntitySet;
  var __slice = Array.prototype.slice;
  EntitySet = (function() {
    function EntitySet() {
      var entities, game;
      game = arguments[0], entities = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.game = game;
      this.entities = entities;
      this.visible = true;
      this.paused = false;
    }
    EntitySet.prototype.add = function() {
      var entity, new_entities, _i, _len, _results;
      new_entities = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = new_entities.length; _i < _len; _i++) {
        entity = new_entities[_i];
        _results.push(this.entities.push(entity));
      }
      return _results;
    };
    EntitySet.prototype.update = function() {
      var entity, _i, _len, _ref, _results;
      if (!this.paused) {
        _ref = this.entities;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entity = _ref[_i];
          _results.push(entity.update());
        }
        return _results;
      }
    };
    EntitySet.prototype.draw = function(context) {
      var entity, _i, _len, _ref, _results;
      if (this.visible) {
        _ref = this.entities;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entity = _ref[_i];
          _results.push(entity.draw(context));
        }
        return _results;
      }
    };
    EntitySet.prototype.pause = function() {
      return this.paused = true;
    };
    EntitySet.prototype.unpause = function() {
      return this.paused = false;
    };
    EntitySet.prototype.hide = function() {
      return this.visible = false;
    };
    EntitySet.prototype.show = function() {
      return this.visible = true;
    };
    EntitySet.prototype.cull = function() {
      var i, _ref, _results;
      if (this.entities.length) {
        _results = [];
        for (i = _ref = this.entities.length - 1; _ref <= 0 ? i < 0 : i > 0; _ref <= 0 ? i++ : i--) {
          if (this.entities[i].remove_from_world) {
            _results.push(this.entities.splice(i, 1));
          }
        }
        return _results;
      }
    };
    return EntitySet;
  })();
  root.EntitySet = EntitySet;
}).call(this);
