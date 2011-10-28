(function() {
  var AssetManager;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  AssetManager = (function() {
    function AssetManager() {
      this.AssetManager = __bind(this.AssetManager, this);
    }
    AssetManager.successCount = 0;
    AssetManager.errorCount = 0;
    AssetManager.cache = {};
    AssetManager.downloadQueue = [];
    AssetManager.soundsQueue = [];
    AssetManager.images = {};
    AssetManager.asset_lookup = {};
    AssetManager.queueImage = function(id, path) {
      return this.downloadQueue.push({
        id: id,
        path: path
      });
    };
    AssetManager.queueSound = function(id, path) {
      return this.soundsQueue.push({
        id: id,
        path: path
      });
    };
    AssetManager.totalAssets = function() {
      return this.downloadQueue.length + this.soundsQueue.length;
    };
    AssetManager.numFinished = function() {
      return this.successCount + this.errorCount;
    };
    AssetManager.getProgress = function() {
      if (this.totalAssets() === 0) {
        return '0';
      } else {
        return ((this.numFinished() / this.totalAssets()) * 100).toString().slice(0, 4);
      }
    };
    AssetManager.isDone = function() {
      return this.totalAssets() === (this.successCount + this.errorCount);
    };
    AssetManager.downloadAll = function(callback) {
      var i, image, _ref, _results;
      if (this.downloadQueue.length === 0 && this.soundsQueue.length === 0) {
        callback();
      }
      this.downloadSounds(callback);
      _results = [];
      for (i = 0, _ref = this.downloadQueue.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        image = this.downloadQueue[i];
        this.img = new Image();
        this.img.addEventListener('load', __bind(function() {
          this.successCount += 1;
          if (this.isDone()) {
            return callback();
          }
        }, this));
        this.img.addEventListener('error', __bind(function() {
          this.errorCount += 1;
          if (this.isDone()) {
            return callback();
          }
        }, this));
        this.img.src = image.path;
        this.cache[image.path] = this.img;
        _results.push(this.asset_lookup[image.id] = this.cache[image.path]);
      }
      return _results;
    };
    AssetManager.getImage = function(id) {
      return this.asset_lookup[id];
    };
    AssetManager.getSound = function(id) {
      return this.asset_lookup[id];
    };
    AssetManager.getBackgroundSong = function(id) {
      return this.asset_lookup[id];
    };
    AssetManager.playSound = function(id) {
      return this.asset_lookup[id].play();
    };
    AssetManager.downloadSounds = function(callback) {
      var sound, _i, _len, _ref, _results;
      if (typeof soundManager !== "undefined" && soundManager !== null) {
        soundManager.onready(__bind(function() {
          var sound, _i, _len, _ref, _results;
          $logger.sound.info('SoundManager ready');
          _ref = this.soundsQueue;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            sound = _ref[_i];
            _results.push(this.downloadSound(sound.id, sound.path, callback));
          }
          return _results;
        }, this));
        return soundManager.ontimeout(function() {
          return $logger.sound.error('SM2 did not start');
        });
      } else if (this.config.engine === 'buzz') {
        $logger.sound.info('Flying with buzz');
        _ref = this.soundsQueue;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sound = _ref[_i];
          _results.push(this.downloadSound(sound.id, sound.path, callback));
        }
        return _results;
      }
    };
    AssetManager.downloadSound = function(id, path, callback) {
      var manager;
      manager = this;
      this.cache[path] = Mantra.AudioEngine.createSound({
        id: id,
        autoLoad: true,
        url: path,
        callback: callback,
        onload: function() {
          $logger.assets.info(this.url + ("" + this.url + " is loaded"));
          manager.successCount += 1;
          if (manager.isDone()) {
            return callback();
          }
        }
      });
      this.cache[path].restart = function() {
        $logger.sound.info("Restarting '" + this.sID + "'");
        this.stop();
        this.setPosition(0);
        return this.play();
      };
      return this.asset_lookup[id] = this.cache[path];
    };
    AssetManager.configureSoundManager = function(config) {
      this.config = config != null ? config : {};
      if (this.config.engine === 'buzz') {
        return Mantra.AudioEngine.use('buzz');
      } else if (this.config.engine === 'soundmanager') {
        soundManager.url = config.asset_path;
        soundManager.flashVersion = 9;
        soundManager.debugFlash = false;
        soundManager.debugMode = false;
        return soundManager.defaultOptions.volume = 15;
      }
    };
    return AssetManager;
  })();
  root.AssetManager = AssetManager;
}).call(this);
