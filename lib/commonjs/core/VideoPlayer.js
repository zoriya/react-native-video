"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPlayer = void 0;
var _reactNative = require("react-native");
var _reactNativeNitroModules = require("react-native-nitro-modules");
var _VideoError = require("./types/VideoError.js");
var _playerFactory = require("./utils/playerFactory.js");
var _sourceFactory = require("./utils/sourceFactory.js");
var _VideoPlayerEvents = require("./events/VideoPlayerEvents");
class VideoPlayer extends _VideoPlayerEvents.VideoPlayerEvents {
  get player() {
    if (this._player === undefined) {
      throw new _VideoError.VideoRuntimeError('player/released', "You can't access player after it's released");
    }
    return this._player;
  }
  constructor(source) {
    const hybridSource = (0, _sourceFactory.createSource)(source);
    const player = (0, _playerFactory.createPlayer)(hybridSource);

    // Initialize events
    super(player.eventEmitter);
    this._player = player;
  }

  /**
   * Releases the player's native resources and releases native state.
   * @internal
   */
  __destroy() {
    if (this._player === undefined) return;
    this.clearAllEvents();
    try {
      this.player.release();
    } catch (error) {
      // Best effort cleanup: teardown must never crash app unmount.
      console.error('Failed to cleanup native player resources', error);
    }

    // We leave hybrid object to be cleaned up by garbage collector
    // So we update memory size to ensure that memory is released
    // when needed
    this.updateMemorySize();

    // We wait for 5s to let late events that were triggered before release to be processed
    if (this._releaseTimeout !== undefined) {
      clearTimeout(this._releaseTimeout);
    }
    this._releaseTimeout = setTimeout(() => {
      this._player = undefined;
      this._releaseTimeout = undefined;
    }, 5000);
  }

  /**
   * Returns the native (hybrid) player instance.
   * Should not be used outside of the module.
   * @internal
   */
  __getNativePlayer() {
    return this.player;
  }

  /**
   * Handles parsing native errors to VideoRuntimeError and calling onError if provided
   * @internal
   */
  throwError(error) {
    const parsedError = (0, _VideoError.tryParseNativeVideoError)(error);
    if (parsedError instanceof _VideoError.VideoRuntimeError && this.triggerJSEvent('onError', parsedError)) {
      // We don't throw errors if onError is provided
      return;
    }
    throw parsedError;
  }

  /**
   * Updates the memory size of the player and its source. Should be called after any operation that changes the memory size of the player or its source.
   * @internal
   */
  updateMemorySize() {
    _reactNativeNitroModules.NitroModules.updateMemorySize(this.player);
    _reactNativeNitroModules.NitroModules.updateMemorySize(this.player.source);
  }

  /**
   * Wraps a promise to try parsing native errors to VideoRuntimeError
   * @internal
   */
  wrapPromise(promise) {
    return new Promise((resolve, reject) => {
      promise.then(resolve).catch(error => {
        reject(this.throwError(error));
      });
    });
  }

  // Source
  get source() {
    return this.player.source;
  }

  // Status
  get status() {
    return this.player.status;
  }

  // Duration
  get duration() {
    return this.player.duration;
  }

  // Volume
  get volume() {
    return this.player.volume;
  }
  set volume(value) {
    this.player.volume = value;
  }

  // Current Time
  get currentTime() {
    return this.player.currentTime;
  }
  set currentTime(value) {
    this.player.currentTime = value;
  }

  // Muted
  get muted() {
    return this.player.muted;
  }
  set muted(value) {
    this.player.muted = value;
  }

  // Loop
  get loop() {
    return this.player.loop;
  }
  set loop(value) {
    this.player.loop = value;
  }

  // Rate
  get rate() {
    return this.player.rate;
  }
  set rate(value) {
    this.player.rate = value;
  }

  // Mix Audio Mode
  get mixAudioMode() {
    return this.player.mixAudioMode;
  }
  set mixAudioMode(value) {
    this.player.mixAudioMode = value;
  }

  // Ignore Silent Switch Mode
  get ignoreSilentSwitchMode() {
    return this.player.ignoreSilentSwitchMode;
  }
  set ignoreSilentSwitchMode(value) {
    if (__DEV__ && !["ios"].includes(_reactNative.Platform.OS)) {
      console.warn("ignoreSilentSwitchMode is not supported on this platform, it wont have any effect");
    }
    this.player.ignoreSilentSwitchMode = value;
  }

  // Play In Background
  get playInBackground() {
    return this.player.playInBackground;
  }
  set playInBackground(value) {
    this.player.playInBackground = value;
  }

  // Play When Inactive
  get playWhenInactive() {
    return this.player.playWhenInactive;
  }
  set playWhenInactive(value) {
    this.player.playWhenInactive = value;
  }

  // Is Playing
  get isPlaying() {
    return this.player.isPlaying;
  }
  get showNotificationControls() {
    return this.player.showNotificationControls;
  }
  set showNotificationControls(value) {
    this.player.showNotificationControls = value;
  }
  async initialize() {
    await this.wrapPromise(this.player.initialize());
    this.updateMemorySize();
  }
  async preload() {
    await this.wrapPromise(this.player.preload());
    this.updateMemorySize();
  }

  /**
   * Releases the player's native resources and releases native state.
   * After calling this method, the player is no longer usable.
   * Accessing any properties or methods of the player after calling this method will throw an error.
   * If you want to clean player resource use `replaceSourceAsync` with `null` instead.
   */
  release() {
    this.__destroy();
  }
  play() {
    try {
      this.player.play();
    } catch (error) {
      this.throwError(error);
    }
  }
  pause() {
    try {
      this.player.pause();
    } catch (error) {
      this.throwError(error);
    }
  }
  seekBy(time) {
    try {
      this.player.seekBy(time);
    } catch (error) {
      this.throwError(error);
    }
  }
  seekTo(time) {
    try {
      this.player.seekTo(time);
    } catch (error) {
      this.throwError(error);
    }
  }
  async replaceSourceAsync(source) {
    this.updateMemorySize();
    await this.wrapPromise(this.player.replaceSourceAsync(source === null ? null : (0, _sourceFactory.createSource)(source)));
    this.updateMemorySize();
  }

  // Text Track Management
  getAvailableTextTracks() {
    try {
      return this.player.getAvailableTextTracks();
    } catch (error) {
      this.throwError(error);
      return [];
    }
  }
  selectTextTrack(textTrack) {
    try {
      this.player.selectTextTrack(textTrack);
    } catch (error) {
      this.throwError(error);
    }
  }

  // Selected Text Track
  get selectedTrack() {
    return this.player.selectedTrack;
  }
}
exports.VideoPlayer = VideoPlayer;
//# sourceMappingURL=VideoPlayer.js.map