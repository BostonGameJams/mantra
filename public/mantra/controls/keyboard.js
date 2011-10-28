(function() {
  Mantra.Controls = {
    moveByKeys: function() {
      if (keydown.left) {
        this.x -= this.speed;
      }
      if (keydown.right) {
        this.x += this.speed;
      }
      if (keydown.up) {
        this.y -= this.speed;
      }
      if (keydown.down) {
        return this.y += this.speed;
      }
    }
  };
}).call(this);
