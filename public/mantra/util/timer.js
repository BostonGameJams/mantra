(function() {
  Mantra.Timer = (function() {
    function Timer() {
      this.time_passed = 0;
      this.max_step = 0.05;
      this.last_timestamp = 0;
    }
    Timer.prototype.tick = function() {
      var current_timestamp, time_delta, walled_time_delta;
      current_timestamp = Date.now();
      time_delta = (current_timestamp - this.last_timestamp) / 1000;
      walled_time_delta = Math.min(time_delta, this.max_step);
      this.last_timestamp = current_timestamp;
      this.time_passed += walled_time_delta;
      return walled_time_delta;
    };
    Timer.after = function(obj, options) {
      var timer;
      if (options == null) {
        options = {};
      }
      timer = new Mantra.Timer();
      obj.addTimer(timer);
      if (options.milliseconds != null) {
        options.seconds = options.milliseconds / 1000;
      }
      return function() {
        return timer.time_passed > options.seconds;
      };
    };
    return Timer;
  })();
}).call(this);
