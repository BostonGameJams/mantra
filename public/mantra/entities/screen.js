(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __slice = Array.prototype.slice;
  Mantra.Screen = (function() {
    __extends(Screen, EntitySet);
    Screen.presets = {
      'intro': {
        panes: function(options) {
          var intro_ui_pane;
          intro_ui_pane = new Mantra.UIPane(this.game);
          intro_ui_pane.addTextItem({
            color: 'orange',
            x: 'centered',
            y: 'centered',
            text: function() {
              return (typeof options.text === 'function' ? options.text.call(this.game) : options.text) || 'Click to start!';
            }
          });
          return [intro_ui_pane];
        },
        onUpdate: function() {
          if (this.click) {
            return this.showScreen('game');
          }
        }
      },
      'loading': {
        panes: function(options) {
          var ui_pane;
          ui_pane = new Mantra.UIPane(this.game);
          ui_pane.addTextItem({
            color: 'orange',
            x: 'centered',
            y: 'centered',
            text: function() {
              return "Loading... " + (AssetManager.getProgress()) + "%";
            }
          });
          return [ui_pane];
        },
        onUpdate: function() {
          if (this.state.current_state !== 'initialized' && AssetManager.isDone()) {
            return this.showScreen('intro');
          }
        }
      },
      'pause': {
        panes: function(options) {
          var ui_pane;
          ui_pane = new Mantra.UIPane(this.game);
          ui_pane.addTextItem({
            color: 'white',
            x: 'centered',
            y: 'centered',
            text: function() {
              return ':: paused ::';
            }
          });
          return [ui_pane];
        },
        on_keys: {
          P: function() {
            this.game.showScreen(this.options.gameScreen || 'game');
            if (this.game.bg_song) {
              return this.game.bg_song.resume();
            }
          }
        }
      }
    };
    function Screen(game, name, options) {
      var pane, preset, _i, _len, _ref;
      this.game = game;
      this.name = name;
      this.options = options != null ? options : {};
      this.key_map = {};
      Screen.__super__.constructor.call(this, this.game);
      if (this.options.preset && (preset = Mantra.Screen.presets[this.options.preset])) {
        if (preset.panes) {
          _ref = preset.panes.apply(this, [this.options]);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            pane = _ref[_i];
            this.add(pane);
          }
        }
        if (preset.onUpdate) {
          this.onUpdate = preset.onUpdate;
        }
        if (preset.on_keys) {
          this.addKeyMappings(preset.on_keys);
        }
      }
      if (this.options.elements) {
        this.add.apply(this, this.options.elements.call(this.game));
      }
      if (this.options.update) {
        this.onUpdate = this.options.update;
      }
      if (this.options.on_keys) {
        this.addKeyMappings(this.options.on_keys);
      }
    }
    Screen.prototype.add = function() {
      var entity, new_entities, _i, _len;
      new_entities = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = new_entities.length; _i < _len; _i++) {
        entity = new_entities[_i];
        entity.screen = this;
      }
      return Screen.__super__.add.apply(this, new_entities);
    };
    Screen.prototype.update = function() {
      if (this.onUpdate && !this.paused) {
        this.onUpdate.call(this.game);
      }
      return Screen.__super__.update.call(this);
    };
    Screen.prototype.turnOff = function() {
      this.hide();
      return this.pause();
    };
    Screen.prototype.turnOn = function() {
      if (this.been_shown) {
        this.onResume();
      } else {
        this.been_shown = true;
        this.onStart();
      }
      this.show();
      return this.unpause();
    };
    Screen.prototype.onStart = function() {
      return null;
    };
    Screen.prototype.onResume = function() {
      return null;
    };
    Screen.prototype.addKeyMappings = function(key_mappings) {
      return _.extend(this.key_map, key_mappings);
    };
    Screen.prototype.onKey = function(key) {
      if (this.key_map[key]) {
        return this.key_map[key].apply(this);
      }
    };
    return Screen;
  })();
}).call(this);
