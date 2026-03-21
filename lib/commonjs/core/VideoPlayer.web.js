"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPlayer = void 0;
var _video = _interopRequireDefault(require("video.js"));
var _VideoPlayerEvents = require("./VideoPlayerEvents.js");
var _MediaSession = require("./web/MediaSession.js");
var _WebEventEmiter = require("./web/WebEventEmiter.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// declared https://github.com/videojs/video.js/blob/main/src/js/tracks/track-list.js#L58

// declared https://github.com/videojs/videojs-contrib-quality-levels/blob/main/src/quality-level.js#L32

class VideoPlayer extends _VideoPlayerEvents.VideoPlayerEvents {
  constructor(source) {
    const video = document.createElement("video");
    const player = (0, _video.default)(video, {
      qualityLevels: true,
      html5: {
        preloadTextTracks: false,
        nativeTextTracks: true
      }
    });
    // @ts-ignore used for debugging or extending purposes
    window.videojs = _video.default;
    super(new _WebEventEmiter.WebEventEmiter(player));
    this.video = video;
    this.player = player;
    this.mediaSession = new _MediaSession.MediaSessionHandler(this.player);
    this.replaceSourceAsync(source);
  }

  /**
   * Cleans up player's native resources and releases native state.
   * After calling this method, the player is no longer usable.
   * @internal
   */
  __destroy() {
    this.player.dispose();
  }
  __getNativeRef() {
    return this.video;
  }

  // Source
  get source() {
    return {
      uri: this._source.uri,
      config: this._source,
      getAssetInformationAsync: async () => {
        return {
          bitrate: NaN,
          width: this.player.videoWidth(),
          height: this.player.videoHeight(),
          duration: this.duration,
          fileSize: BigInt(NaN),
          isHDR: false,
          isLive: false,
          orientation: "landscape"
        };
      }
    };
  }

  // Status
  get status() {
    if (this.video.error) return "error";
    if (this.video.readyState === HTMLMediaElement.HAVE_NOTHING) return "idle";
    if (this.video.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA || this.video.readyState === HTMLMediaElement.HAVE_FUTURE_DATA) return "readyToPlay";
    return "loading";
  }

  // Duration
  get duration() {
    return this.player.duration() ?? NaN;
  }

  // Volume
  get volume() {
    return this.player.volume() ?? 1;
  }
  set volume(value) {
    this.player.volume(value);
  }

  // Current Time
  get currentTime() {
    return this.player.currentTime() ?? NaN;
  }
  set currentTime(value) {
    this.player.currentTime(value);
  }

  // Muted
  get muted() {
    return this.player.muted() ?? false;
  }
  set muted(value) {
    this.player.muted(value);
  }

  // Loop
  get loop() {
    return this.player.loop() ?? false;
  }
  set loop(value) {
    this.player.loop(value);
  }

  // Rate
  get rate() {
    return this.player.playbackRate() ?? 1;
  }
  set rate(value) {
    this.player.playbackRate(value);
  }

  // Mix Audio Mode
  get mixAudioMode() {
    return "auto";
  }
  set mixAudioMode(_) {}

  // Ignore Silent Switch Mode
  get ignoreSilentSwitchMode() {
    return "auto";
  }
  set ignoreSilentSwitchMode(_) {}

  // Play In Background
  get playInBackground() {
    return true;
  }
  set playInBackground(_) {}

  // Play When Inactive
  get playWhenInactive() {
    return true;
  }
  set playWhenInactive(_) {}
  get isPlaying() {
    return !this.player.paused();
  }
  get showNotificationControls() {
    return this.mediaSession.enabled;
  }
  set showNotificationControls(value) {
    if (!value) {
      this.mediaSession.disable();
      return;
    }
    this.mediaSession.enable();
    this.mediaSession.updateMediaSession(this._source?.metadata);
  }
  async initialize() {
    // noop on web
  }
  async preload() {
    this.player.load();
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
    // error are already handled by the `onError` callback, no need to catch it here.
    this.player.play()?.catch();
  }
  pause() {
    this.player.pause();
  }
  seekBy(time) {
    const now = this.player.currentTime() ?? 0;
    this.player.currentTime(now + time);
  }
  seekTo(time) {
    this.player.currentTime(time);
  }
  async replaceSourceAsync(source) {
    if (!source) {
      this.player.src([]);
      this.player.reset();
      return;
    }
    if (typeof source === "string") {
      source = {
        uri: source
      };
    }
    if (typeof source === "number" || typeof source.uri === "number") {
      console.error("A source uri must be a string. Numbers are only supported on native.");
      return;
    }
    this._source = source;
    // TODO: handle start time
    this.player.src({
      src: source.uri,
      type: source.mimeType
    });
    if (this.mediaSession.enabled) this.mediaSession.updateMediaSession(source.metadata);
    for (const sub of source.externalSubtitles ?? []) {
      this.player.addRemoteTextTrack({
        id: sub.uri,
        kind: "subtitles",
        label: sub.label,
        src: sub.uri,
        srclang: sub.language
      });
    }
    if (source.initializeOnCreation) await this.preload();
  }

  // Text Track Management

  getAvailableTextTracks() {
    // @ts-expect-error they define length & index properties via prototype
    const tracks = this.player.textTracks();
    return [...Array(tracks.length)].map((_, i) => ({
      id: tracks[i].id,
      label: tracks[i].label,
      language: tracks[i].language,
      selected: tracks[i].mode === "showing"
    }));
  }
  selectTextTrack(textTrack) {
    // @ts-expect-error they define length & index properties via prototype
    const tracks = this.player.textTracks();
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = tracks[i].id === textTrack?.id ? "showing" : "disabled";
    }
  }

  // Selected Text Track
  get selectedTrack() {
    return this.getAvailableTextTracks().find(x => x.selected);
  }

  // audio tracks

  getAvailableAudioTracks() {
    // @ts-expect-error they define length & index properties via prototype
    const tracks = this.player.audioTracks();
    return [...Array(tracks.length)].map((_, i) => ({
      id: tracks[i].id,
      label: tracks[i].label,
      language: tracks[i].language,
      selected: tracks[i].enabled
    }));
  }
  selectAudioTrack(track) {
    // @ts-expect-error they define length & index properties via prototype
    const tracks = this.player.audioTracks();
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].enabled = tracks[i].id === track?.id;
    }
  }
  get selectedAudioTrack() {
    return this.getAvailableAudioTracks().find(x => x.selected);
  }

  // video tracks

  getAvailableVideoTracks() {
    // @ts-expect-error they define length & index properties via prototype
    const tracks = this.player.videoTracks();
    return [...Array(tracks.length)].map((_, i) => ({
      id: tracks[i].id,
      label: tracks[i].label,
      language: tracks[i].language,
      selected: tracks[i].enabled
    }));
  }
  selectVideoTrack(track) {
    // @ts-expect-error they define length & index properties via prototype
    const tracks = this.player.videoTracks();
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].enabled = tracks[i].id === track?.id;
    }
  }
  get selectedVideoTrack() {
    return this.getAvailableVideoTracks().find(x => x.selected);
  }

  // quality

  getAvailableQualities() {
    // @ts-expect-error this isn't typed
    const levels = this.player.qualityLevels();
    return [...Array(levels.length)].map((_, i) => ({
      id: levels[i].id,
      width: levels[i].width,
      height: levels[i].height,
      bitrate: levels[i].bitrate,
      selected: levels.selectedIndex === i
    }));
  }
  selectQuality(quality) {
    // @ts-expect-error this isn't typed
    const levels = this.player.qualityLevels();
    for (let i = 0; i < levels.length; i++) {
      // if quality is null, enable back auto-quality switch (so enable all lvls)
      levels[i].enabled = !quality || levels[i].id === quality.id;
    }
  }
  get currentQuality() {
    return this.getAvailableQualities().find(x => x.selected);
  }
  get autoQualityEnabled() {
    // @ts-expect-error this isn't typed
    const levels = this.player.qualityLevels();
    // if we have a quality disabled that means we manually disabled it & disabled auto quality
    for (let i = 0; i < levels.length; i++) {
      if (!levels[i].enabled) return false;
    }
    return true;
  }
}
exports.VideoPlayer = VideoPlayer;
//# sourceMappingURL=VideoPlayer.web.js.map