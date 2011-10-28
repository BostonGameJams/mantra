(function() {
  define(['order!lib/jquery/jquery-1.6.2', 'order!lib/jquery/jquery.hotkeys', 'order!lib/underscore', 'order!lib/base', 'order!lib/machine', 'order!lib/shims', 'order!lib/js-finite-state-machine', 'order!lib/helpers', 'order!mantra/util/util', 'order!mantra/entities/entities', 'order!mantra/levels/levels', 'order!mantra/etc', 'order!games/games'], function(jquery, jquery_hotkeys) {
    var launchGame;
    console.log('Mantra is loaded!');
    launchGame = function(game_name) {
      var game, game_launcher;
      game_launcher = GameLauncher.launchInto(game_name, Mantra.Canvas.j_createCanvas().appendTo('#game_holder').get(0));
      return game = game_launcher.game;
    };
    return launchGame(eval(geturlparameter('game') || 'EightByFive'));
  });
}).call(this);
