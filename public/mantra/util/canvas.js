(function() {
  Mantra.Canvas = (function() {
    function Canvas() {}
    Canvas.create_canvas = function() {
      return this.j_createCanvas().prependTo('body').get(0);
    };
    Canvas.j_createCanvas = function() {
      return $('<canvas>').attr({
        id: 'game_surface',
        width: '800',
        height: '600'
      }).css({
        'background-color': 'black',
        margin: '0px auto',
        display: 'block'
      });
    };
    Canvas.circle = function(context, params) {
      context.fillStyle = params.style;
      context.beginPath();
      context.arc(params.x, params.y, params.radius, 0, Math.PI * 2, true);
      context.closePath();
      return context.fill();
    };
    Canvas.rectangle = function(context, params) {
      context.fillStyle = params.style;
      context.strokeStyle = params.style;
      context.lineWidth = params.borderWidth || 1;
      if (params.hollow) {
        return context.strokeRect(params.x, params.y, params.w, params.h);
      } else {
        return context.fillRect(params.x, params.y, params.w, params.h);
      }
    };
    return Canvas;
  })();
}).call(this);
