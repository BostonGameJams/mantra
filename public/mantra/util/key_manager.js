(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Mantra.KeyManager = (function() {
    function KeyManager() {}
    KeyManager.capture_keypresses = function(game, steal) {
      this.game = game;
      if (steal == null) {
        steal = 'basic';
      }
      window.keydown = {};
      return $(__bind(function() {
        $(document).bind('keydown', __bind(function(event) {
          keydown[this.keyName(event)] = true;
          return this.hasMod(event) || !steal;
        }, this));
        return $(document).bind('keyup', __bind(function(event) {
          var key, key_name;
          key = String.fromCharCode(event.which);
          key_name = this.keyName(event);
          keydown[key_name] = false;
          $logger.input.debug("Key pressed: '" + key + "' (" + key_name + ")");
          if (this.game) {
            this.game.onKey(key);
          }
          return this.hasMod(event) || !steal;
        }, this));
      }, this));
    };
    KeyManager.keyName = function(event) {
      return $.hotkeys.specialKeys[event.which] || String.fromCharCode(event.which).toLowerCase();
    };
    KeyManager.hasMod = function(event) {
      return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    };
    return KeyManager;
  })();
}).call(this);
