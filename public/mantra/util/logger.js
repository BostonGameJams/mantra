(function() {
  var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Mantra.Logger = (function() {
    Logger.instance = function() {
      var _ref;
      return (_ref = this.singleton) != null ? _ref : this.singleton = new Mantra.Logger;
    };
    Logger.level_map = {
      debug: 4,
      info: 3,
      warn: 2,
      error: 1,
      off: 0
    };
    function Logger(log_levels) {
      this.log_levels = log_levels != null ? log_levels : {};
      null;
    }
    Logger.prototype.subsystems = function() {
      var subsystems, system, _i, _len, _results;
      subsystems = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = subsystems.length; _i < _len; _i++) {
        system = subsystems[_i];
        _results.push(this.registerSubsystem(system));
      }
      return _results;
    };
    Logger.prototype.registerSubsystem = function(name) {
      return this[name] = {
        debug: __bind(function(message) {
          if (Mantra.Logger.level_map[this.log_levels[name]] >= Mantra.Logger.level_map['debug']) {
            return this.log("[" + name + "] " + message);
          }
        }, this),
        info: __bind(function(message) {
          if (Mantra.Logger.level_map[this.log_levels[name]] >= Mantra.Logger.level_map['info']) {
            return this.log("[" + name + "] " + message);
          }
        }, this),
        warn: __bind(function(message) {
          if (Mantra.Logger.level_map[this.log_levels[name]] >= Mantra.Logger.level_map['warn']) {
            return this.log("[" + name + "] " + message);
          }
        }, this),
        error: __bind(function(message) {
          if (Mantra.Logger.level_map[this.log_levels[name]] >= Mantra.Logger.level_map['error']) {
            return this.log("[" + name + "] " + message);
          }
        }, this)
      };
    };
    Logger.prototype.log = function(message) {
      return console.log(message);
    };
    Logger.prototype.levels = function(log_levels) {
      this.log_levels = log_levels;
      return null;
    };
    return Logger;
  })();
}).call(this);
