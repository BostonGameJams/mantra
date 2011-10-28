(function() {
  Mantra.Map = (function() {
    function Map(options) {
      this.options = options;
      this.map_width = this.options.map_width;
      this.map_height = this.options.map_height;
      this.tile_width = this.options.tile_width;
      this.tile_height = this.options.tile_height;
      this.translations = this.options.translations;
      this.map_data = this.options.data;
      if (typeof this.map_data === 'string') {
        this.map_data = this.map_data.replace(/\n/g, '').trim().split('');
      }
    }
    Map.prototype.objectMap = function() {
      return this.object_map || (this.object_map = this.generateObjectMap());
    };
    Map.prototype.generateObjectMap = function() {
      var i, object_map, tile, _i, _len, _ref;
      i = 0;
      object_map = [];
      _ref = this.map_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tile = _ref[_i];
        if (this.translations[tile] !== null) {
          object_map.push({
            x: i % this.map_width * this.tile_width,
            y: Math.floor(i / this.map_width) * this.tile_height,
            obj: this.translations[tile]
          });
        }
        i++;
      }
      return object_map;
    };
    Map.prototype.presenceLookup = function() {
      return this.presence_map || (this.presence_map = this.generatePresenceLookup());
    };
    Map.prototype.generatePresenceLookup = function() {
      var datum, i, lookup, x, y, _i, _len, _ref;
      i = 0;
      lookup = {};
      _ref = this.map_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        datum = _ref[_i];
        x = i % this.map_width;
        y = Math.floor(i / this.map_width);
        if (this.tileIsSolid(datum)) {
          lookup["" + x + "|" + y] = true;
        }
        i++;
      }
      return lookup;
    };
    Map.prototype.tileIsSolid = function(tile) {
      var _ref;
      return !!((_ref = this.translations[tile]) != null ? _ref.solid : void 0);
    };
    Map.prototype.tileCollision = function(obj) {
      return Mantra.Map.tileCollision(obj, this, this.presenceLookup());
    };
    Map.tileCollision = function(obj, map_def, presence_map) {
      var approximation, bottom_tile, left_tile, right_tile, t, tolerance, top_tile, _ref, _ref2, _ref3, _step, _step2;
      _ref = [false, false, false, false], obj.touchedup = _ref[0], obj.toucheddown = _ref[1], obj.touchedleft = _ref[2], obj.touchedright = _ref[3];
            if (typeof data !== "undefined" && data !== null) {
        data;
      } else {
        data = {};
      };
      tolerance = data.tolerance || 6;
      approximation = data.approximation || 10;
      for (t = tolerance, _ref2 = obj.colw - tolerance, _step = approximation; tolerance <= _ref2 ? t <= _ref2 : t >= _ref2; t += _step) {
        bottom_tile = this.getTileInMap(presence_map, obj.x + obj.colx + t, obj.y + obj.coly + obj.colh - 1, map_def.tile_width, map_def.tile_height, map_def.map_width, map_def.map_height);
        top_tile = this.getTileInMap(presence_map, obj.x + obj.colx + t, obj.y + obj.coly, map_def.tile_width, map_def.tile_height, map_def.map_width, map_def.map_height);
        if (bottom_tile) {
          obj.toucheddown = true;
        }
        if (top_tile) {
          obj.touchedup = true;
        }
      }
      for (t = tolerance, _ref3 = obj.colh - tolerance, _step2 = approximation; tolerance <= _ref3 ? t <= _ref3 : t >= _ref3; t += _step2) {
        left_tile = this.getTileInMap(presence_map, obj.x + obj.colx, obj.y + obj.coly + t, map_def.tile_width, map_def.tile_height, map_def.map_width, map_def.map_height);
        right_tile = this.getTileInMap(presence_map, obj.x + obj.colx + obj.colw - 1, obj.y + obj.coly + t, map_def.tile_width, map_def.tile_height, map_def.map_width, map_def.map_height);
        if (left_tile) {
          obj.touchedleft = true;
        }
        if (right_tile) {
          obj.touchedright = true;
        }
      }
      if (obj.touchedup) {
        obj.y = this.yPixelToTile(map_def.tile_height, obj.y + obj.coly) - obj.coly;
      }
      if (obj.toucheddown) {
        obj.y = this.yPixelToTile(map_def.tile_height, obj.y + obj.coly + obj.colh, 0) - obj.coly - obj.colh;
      }
      if (obj.touchedleft) {
        obj.x = this.xPixelToTile(map_def.tile_width, obj.x + obj.colx, 1) - obj.colx;
      }
      if (obj.touchedright) {
        return obj.x = this.xPixelToTile(map_def.tile_width, obj.x + obj.colx + obj.colw - 1, 0) - obj.colx - obj.colw;
      }
    };
    Map.getTileInMap = function(presence_map, x, y, tile_width, tile_height, map_width, map_height) {
      var tile_x, tile_y;
      tile_x = (Math.floor(x / tile_width)) - 1;
      tile_y = (Math.floor(y / tile_height)) - 1;
      if (presence_map["" + tile_x + "|" + tile_y]) {
        return 'solid';
      }
      return null;
    };
    Map.yPixelToTile = function(tile_height, y, gap) {
      if (gap == null) {
        gap = 1;
      }
      return (Math.floor(y / tile_height) + gap) * tile_height;
    };
    Map.xPixelToTile = function(tile_width, x, gap) {
      if (gap == null) {
        gap = 1;
      }
      return (Math.floor(x / tile_width) + gap) * tile_width;
    };
    return Map;
  })();
}).call(this);
