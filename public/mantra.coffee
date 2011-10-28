define [
  'order!lib/jquery/jquery-1.6.2'
  'order!lib/jquery/jquery.hotkeys'
  'order!lib/underscore'
  'order!lib/base'
  'order!lib/machine'
  'order!lib/shims'
  'order!lib/js-finite-state-machine'
  'order!lib/helpers'
  'order!mantra/util/util'
  'order!mantra/entities/entities'
  'order!mantra/levels/levels'
  'order!mantra/etc'
  'order!games/games'
  # 'order!mantra/events/event_manager'
  # 'cs!../mantra/effects/bullet'
  # 'cs!../mantra/core/game'
  # 'cs!../mantra/controls/keyboard'
  # 'cs!../mantra/config'
  # 'cs!../games/games'
], (jquery, jquery_hotkeys) ->
  # controller.attach view
  # console.log 'regular name is: ' + jquery
  console.log 'Mantra is loaded!'

  launchGame = (game_name) ->
    game_launcher = GameLauncher.launchInto(game_name, Mantra.Canvas.j_createCanvas().appendTo('#game_holder').get(0))
    game = game_launcher.game

  launchGame eval(geturlparameter('game') ||'EightByFive')
