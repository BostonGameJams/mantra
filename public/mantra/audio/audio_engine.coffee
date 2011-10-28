class Mantra.AudioEngine
  @instance: ->
    @singleton ?= new Mantra.AudioEngine

  @use: (name) ->
    if name == 'buzz'
      @singleton = new Mantra.BuzzAudioEngine

  @createSound: (options) -> @singleton.createSound options
