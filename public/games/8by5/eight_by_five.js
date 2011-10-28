(function() {
  var EightByFive;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __slice = Array.prototype.slice;
  EightByFive = (function() {
    __extends(EightByFive, Mantra.Game);
    function EightByFive(options) {
      this.options = options != null ? options : {};
      this.player_name = 'Player 1';
      EightByFive.__super__.constructor.call(this, _.defaults(this.options, {
        assets: {
          root_path: '../games/8by5/',
          sounds: {
            'bullet_shot': 'simple_shot.mp3'
          }
        },
        screens: {
          loading: 'preset',
          pause: 'preset',
          intro: {
            preset: 'intro',
            text: function() {
              return "" + this.player_name + ", click anywhere to start!";
            }
          },
          game: {
            elements: function() {
              var ent, map_enities, _i, _len, _ref;
              this.defender = new Mantra.Defender(this);
              this.defender.setCoords({
                x: 332,
                y: 182
              });
              this.map = this.loadMap();
              map_enities = [];
              _ref = this.map.objectMap();
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                ent = _ref[_i];
                map_enities.push(new Mantra.MapEntity(this, {
                  x: ent.x,
                  y: ent.y,
                  w: 32,
                  h: 32,
                  style: ent.obj.color
                }));
              }
              return [this.defender].concat(__slice.call(map_enities));
            },
            on_keys: {
              P: function() {
                return this.game.showScreen('pause');
              }
            }
          }
        }
      }));
    }
    EightByFive.prototype.loadMap = function() {
      return new Mantra.Map({
        map_width: 22,
        map_height: 20,
        tile_width: 32,
        tile_height: 32,
        translations: {
          'o': {
            solid: true,
            color: 'orange'
          },
          'r': {
            solid: false,
            color: 'red'
          },
          'x': {
            solid: true
          },
          ' ': null
        },
        data: 'xxxxxxxxxxxxxxxxxxxxxx\nx    x x             x\nx      x             x\nx      xxxx       xxxx\nx  x   x    r        x\nx      x      o      x\nx  o                 x\nx            x x     x\nx            xxx     x\nx      xx            x\nx      xx            x\nx      xx o     oo   x\nx      xx            x\nx      xx     xxxxxxxx\nx                    x\nx      xx r          x\nx      xx      or    x\nxxxxxxxxxxxxxxxxxxxxxx'
      });
    };
    EightByFive.prototype.configureEngine = function() {
      return $logger.levels({
        global: 'debug',
        sound: 'warn',
        assets: 'debug',
        input: 'info',
        game: 'info'
      });
    };
    return EightByFive;
  })();
  root.EightByFive = EightByFive;
}).call(this);
