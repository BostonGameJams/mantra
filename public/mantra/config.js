(function() {
  if (typeof soundManager !== "undefined" && soundManager !== null) {
    AssetManager.configureSoundManager(root.asset_path);
  }
}).call(this);
