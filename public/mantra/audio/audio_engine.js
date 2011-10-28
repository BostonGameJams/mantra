(function() {
  Mantra.AudioEngine = (function() {
    function AudioEngine() {}
    AudioEngine.instance = function() {
      var _ref;
      return (_ref = this.singleton) != null ? _ref : this.singleton = new Mantra.AudioEngine;
    };
    AudioEngine.use = function(name) {
      if (name === 'buzz') {
        return this.singleton = new Mantra.BuzzAudioEngine;
      }
    };
    AudioEngine.createSound = function(options) {
      return this.singleton.createSound(options);
    };
    return AudioEngine;
  })();
}).call(this);
