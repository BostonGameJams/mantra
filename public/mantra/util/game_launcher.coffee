class GameLauncher
  constructor: (game_name, @canvas) ->
    @game = new game_name {
      canvas: @canvas
    }

  init: (assets = @game.assets) ->
    console.log 'Queueing up assets to load...'

    assets.images ?= []
    assets.sounds ?= []

    @configureEngine()

    console.log 'Initializing game...'

    # Setup the sound manager
    if soundManager?
      AssetManager.configureSoundManager
        engine:     'soundmanager'
        asset_path: root.asset_path
    else
      AssetManager.configureSoundManager
        engine:     'buzz'
        asset_path: root.asset_path
    $logger.assets.debug "# assets: #{assets.images.length}"

    Mantra.KeyManager.capture_keypresses @game

    @game.init()

    root_asset_path = assets.root_path
    @addImage id, "#{root_asset_path}images/#{path}" for id, path of assets.images
    @addSound id, "#{root_asset_path}audio/#{path}"  for id, path of assets.sounds
    @addSound id, "#{root_asset_path}audio/#{path}"  for id, path of assets.music
    # $logger.assets.debug "assets added: #{assets.images.length + assets.sounds.length + assets.music.length}"
    $logger.assets.debug "assets added"

  configureEngine: ->
    root.$em            = Mantra.EventManager.instance()
    root.$logger        = Mantra.Logger.instance()
    root.$audio_manager = Mantra.AudioManager.instance()

    $logger.subsystems 'global', 'sound', 'assets', 'input', 'game'

    @game.configureEngine()

  launch: -> AssetManager.downloadAll (=> @start())

  start: ->
    console.log 'Assets loaded. Launching game...'
    console.log @game.state.current_state
    @game.start() if @game.state.current_state == 'initialized'

  addImage: (id, name) -> AssetManager.queueImage id, "#{root.asset_path}#{name}"
  addSound: (id, name) -> AssetManager.queueSound id, "#{root.asset_path}#{name}"

  @launchInto: (game_klass, canvas) ->
    @launcher = new GameLauncher game_klass, canvas
    @launcher.init()
    @launcher.launch()
    @launcher

  @launch: (game_klass) ->
    @launchInto game_klass

root.GameLauncher = GameLauncher