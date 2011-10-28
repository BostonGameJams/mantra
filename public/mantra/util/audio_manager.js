(function() {
  Mantra.AudioManager = (function() {
    AudioManager.instance = function() {
      var _ref;
      return (_ref = this.singleton) != null ? _ref : this.singleton = new Mantra.AudioManager;
    };
    function AudioManager() {
      this.muted = false;
    }
    AudioManager.prototype.toggle_mute = function() {
      if (this.muted) {
        $logger.log('unmuting');
      } else {
        $logger.log('muting');
      }
      return this.muted = !this.muted;
    };
    return AudioManager;
  })();
}).call(this);
