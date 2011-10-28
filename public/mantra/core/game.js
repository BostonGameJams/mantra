(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  Mantra.Game = (function() {
    function Game(options) {
      var definition, screen_name, _ref, _ref2, _ref3;
      this.options = options;
      this.gameLoop = __bind(this.gameLoop, this);
            if ((_ref = this.canvas) != null) {
        _ref;
      } else {
        this.canvas = this.options.canvas || Mantra.Canvas.create_canvas();
      };
      this.context = this.canvas.getContext('2d');
      this.entities = [];
      this.timer = new Mantra.Timer;
      this.screens = {};
      this.key_map = {};
      _.defaults(this.options, {
        assets: {
          images: []
        },
        screens: {
          loading: 'preset'
        },
        center_coordinates: false,
        process_game_over: function() {
          return null;
        }
      });
      if (this.options.center_coordinates) {
        this.center_coordinates = true;
      }
      this.state = new FSM('initialized', {
        name: 'initialized'
      });
      this.state.add_transition('start', 'initialized', null, 'started');
      this.state.add_transition('lose', 'started', (__bind(function() {
        return this.options.process_game_over.call(this);
      }, this)), 'game_lost');
      this.state.add_transition('restart', ['started', 'game_won', 'game_lost'], null, 'started');
      _ref2 = [null, null, null, null], this.surfaceWidth = _ref2[0], this.surfaceHeight = _ref2[1], this.halfSurfaceWidth = _ref2[2], this.halfSurfaceHeight = _ref2[3];
      _ref3 = this.options.screens;
      for (screen_name in _ref3) {
        definition = _ref3[screen_name];
        if (typeof definition === 'string' && definition === 'preset') {
          definition = {
            preset: screen_name
          };
        }
        this.defineScreen(screen_name, definition);
      }
      if (this.options.on_keypress) {
        this.key_map = this.options.on_keypress;
      }
      if (this.options.assets) {
        this.assets(this.options.assets);
      }
    }
    Game.prototype.assets = function(assets) {
      this.assets = assets;
      return null;
    };
    Game.prototype.init = function() {
      this.surfaceWidth = this.canvas.width;
      this.surfaceHeight = this.canvas.height;
      this.halfSurfaceWidth = this.surfaceWidth / 2;
      this.halfSurfaceHeight = this.surfaceHeight / 2;
      this.startGameLoop({
        on_screen: 'loading'
      });
      return this.startInput();
    };
    Game.prototype.start = function() {
      this.showScreen(this.currentScreen);
      this.state.send_event('start');
      return $logger.game.info('Game started');
    };
    Game.prototype.addEntity = function() {
      var entity, new_entities, _i, _len, _results;
      new_entities = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = new_entities.length; _i < _len; _i++) {
        entity = new_entities[_i];
        _results.push(this.entities.push(entity));
      }
      return _results;
    };
    Game.prototype.translateToCenter = function() {
      return this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    };
    Game.prototype.update = function() {
      var entity, i, _i, _j, _len, _len2, _ref, _ref2, _ref3, _results;
      if (this.entities.length) {
        _ref = this.entities;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entity = _ref[_i];
          if (!entity.remove_from_world) {
            entity.update();
          }
        }
        _ref2 = this.entities;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          entity = _ref2[_j];
          entity.cull();
        }
        _results = [];
        for (i = _ref3 = this.entities.length - 1; _ref3 <= 0 ? i < 0 : i > 0; _ref3 <= 0 ? i++ : i--) {
          if (this.entities[i].remove_from_world) {
            _results.push(this.entities.splice(i, 1));
          }
        }
        return _results;
      }
    };
    Game.prototype.draw = function(callback) {
      var entity, _i, _len, _ref;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.save();
      if (this.center_coordinates) {
        this.translateToCenter();
      }
      _ref = this.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        entity.draw(this.context);
      }
      if (callback) {
        callback(this);
      }
      return this.context.restore();
    };
    Game.prototype.loop = function() {
      this.clock_tick = this.timer.tick();
      this.update();
      this.draw();
      return this.click = null;
    };
    Game.prototype.startGameLoop = function(options) {
      if (options == null) {
        options = {};
      }
      if (this.screens[options.on_screen]) {
        this.showScreen(options.on_screen);
      }
      return this.gameLoop();
    };
    Game.prototype.gameLoop = function() {
      this.loop();
      return requestAnimFrame(this.gameLoop, this.canvas);
    };
    Game.prototype.onKey = function(key) {
      if (this.key_map[key]) {
        this.key_map[key]();
      }
      if (this.currentScreen) {
        return this.currentScreen.onKey(key);
      }
    };
    Game.prototype.showScreen = function(screen) {
      var name, skreen, _ref;
      if (typeof screen === 'string') {
        screen = this.screens[screen];
      }
      $logger.game.info("Showing screen '" + screen.name + "'");
      _ref = this.screens;
      for (name in _ref) {
        skreen = _ref[name];
        skreen.turnOff();
      }
      screen.turnOn();
      return this.currentScreen = screen;
    };
    Game.prototype.startInput = function() {
      var getXandY;
      getXandY = __bind(function(e) {
        var x, y;
        x = e.clientX - this.canvas.getBoundingClientRect().left;
        if (this.center_coordinates) {
          x -= this.canvas.width / 2;
        }
        y = e.clientY - this.canvas.getBoundingClientRect().top;
        if (this.center_coordinates) {
          y -= this.canvas.height / 2;
        }
        return {
          x: x,
          y: y
        };
      }, this);
      this.canvas.addEventListener('click', __bind(function(e) {
        this.click = getXandY(e);
        e.stopPropagation();
        return e.preventDefault();
      }, this), false);
      return this.canvas.addEventListener('mousemove', __bind(function(e) {
        return this.mouse = getXandY(e);
      }, this), false);
    };
    Game.prototype.defineScreen = function(name, definition) {
      var screen;
      if (definition == null) {
        definition = {};
      }
      screen = new Mantra.Screen(this, name, definition);
      this.screens[screen.name] = screen;
      return this.addEntity(screen);
    };
    return Game;
  })();
}).call(this);
