(function() {
  Mantra.BuzzAudioEngine = (function() {
    function BuzzAudioEngine() {}
    BuzzAudioEngine.prototype.createSound = function(options) {
      var sound;
      sound = new buzz.sound(options.url);
      sound.bind('loadeddata', function(e) {
        AssetManager.successCount += 1;
        console.log("Sound loaded: " + options.url);
        if (AssetManager.isDone()) {
          return options.callback();
        }
      });
      return sound;
    };
    return BuzzAudioEngine;
  })();
}).call(this);
