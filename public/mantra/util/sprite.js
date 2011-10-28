(function() {
  var Sprite;
  Sprite = (function() {
    function Sprite() {}
    Sprite.rotateAndCache = function(image, angle) {
      var offscreenCanvas, offscreenCtx, size;
      offscreenCanvas = document.createElement('canvas');
      size = Math.max(image.width, image.height);
      offscreenCanvas.width = size;
      offscreenCanvas.height = size;
      offscreenCtx = offscreenCanvas.getContext('2d');
      offscreenCtx.translate(size / 2, size / 2);
      offscreenCtx.rotate(angle + Math.PI / 2);
      offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
      return offscreenCanvas;
    };
    return Sprite;
  })();
  root.Sprite = Sprite;
}).call(this);
