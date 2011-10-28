class Mantra.BuzzAudioEngine
  createSound: (options) ->
    sound = new buzz.sound options.url
    sound.bind 'loadeddata', (e) ->
      AssetManager.successCount += 1
      console.log "Sound loaded: #{options.url}"
      options.callback() if AssetManager.isDone()
    sound