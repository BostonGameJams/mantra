(function() {
  Mantra.Geometry = (function() {
    function Geometry() {}
    Geometry.withinCircle = function(circle, point, options) {
      var circle_radius, distance_squared, radii_squared;
      if (options == null) {
        options = {};
      }
      _.defaults(options, {
        buffer: 0
      });
      circle_radius = circle.radius + options.buffer;
      distance_squared = ((circle.x - point.x) * (circle.x - point.x)) + ((circle.y - point.y) * (circle.y - point.y));
      radii_squared = (circle_radius + point.radius) * (circle_radius + point.radius);
      return distance_squared < radii_squared;
    };
    return Geometry;
  })();
}).call(this);
