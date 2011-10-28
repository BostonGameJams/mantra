(function() {
  var GameLauncher;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  GameLauncher = (function() {
    function GameLauncher(game_name, canvas) {
      this.canvas = canvas;
      this.game = new game_name({
        canvas: this.canvas
      });
    }
    GameLauncher.prototype.init = function(assets) {
      var id, path, root_asset_path, _ref, _ref2, _ref3, _ref4, _ref5;
      if (assets == null) {
        assets = this.game.assets;
      }
      console.log('Queueing up assets to load...');
            if ((_ref = assets.images) != null) {
        _ref;
      } else {
        assets.images = [];
      };
            if ((_ref2 = assets.sounds) != null) {
        _ref2;
      } else {
        assets.sounds = [];
      };
      this.configureEngine();
      console.log('Initializing game...');
      if (typeof soundManager !== "undefined" && soundManager !== null) {
        AssetManager.configureSoundManager({
          engine: 'soundmanager',
          asset_path: root.asset_path
        });
      } else {
        AssetManager.configureSoundManager({
          engine: 'buzz',
          asset_path: root.asset_path
        });
      }
      $logger.assets.debug("# assets: " + assets.images.length);
      Mantra.KeyManager.capture_keypresses(this.game);
      this.game.init();
      root_asset_path = assets.root_path;
      _ref3 = assets.images;
      for (id in _ref3) {
        path = _ref3[id];
        this.addImage(id, "" + root_asset_path + "images/" + path);
      }
      _ref4 = assets.sounds;
      for (id in _ref4) {
        path = _ref4[id];
        this.addSound(id, "" + root_asset_path + "audio/" + path);
      }
      _ref5 = assets.music;
      for (id in _ref5) {
        path = _ref5[id];
        this.addSound(id, "" + root_asset_path + "audio/" + path);
      }
      return $logger.assets.debug("assets added");
    };
    GameLauncher.prototype.configureEngine = function() {
      root.$em = Mantra.EventManager.instance();
      root.$logger = Mantra.Logger.instance();
      root.$audio_manager = Mantra.AudioManager.instance();
      $logger.subsystems('global', 'sound', 'assets', 'input', 'game');
      return this.game.configureEngine();
    };
    GameLauncher.prototype.launch = function() {
      return AssetManager.downloadAll((__bind(function() {
        return this.start();
      }, this)));
    };
    GameLauncher.prototype.start = function() {
      console.log('Assets loaded. Launching game...');
      console.log(this.game.state.current_state);
      if (this.game.state.current_state === 'initialized') {
        return this.game.start();
      }
    };
    GameLauncher.prototype.addImage = function(id, name) {
      return AssetManager.queueImage(id, "" + root.asset_path + name);
    };
    GameLauncher.prototype.addSound = function(id, name) {
      return AssetManager.queueSound(id, "" + root.asset_path + name);
    };
    GameLauncher.launchInto = function(game_klass, canvas) {
      this.launcher = new GameLauncher(game_klass, canvas);
      this.launcher.init();
      this.launcher.launch();
      return this.launcher;
    };
    GameLauncher.launch = function(game_klass) {
      return this.launchInto(game_klass);
    };
    return GameLauncher;
  })();
  root.GameLauncher = GameLauncher;
}).call(this);
