"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPlayer = void 0;
var _VideoPlayerEvents = require("./events/VideoPlayerEvents");
var _MediaSession = require("./web/MediaSession.js");
var _WebEventEmitter = require("./web/WebEventEmitter.js");
class VideoPlayer extends _VideoPlayerEvents.VideoPlayerEvents {
  _store = null;
  mediaSession = null;
  /**
   * Creates a detached <video> element that works immediately.
   * VideoView later mounts it into the DOM and connects the video.js store.
   */
  constructor(source) {
    if (typeof window === "undefined") {
      throw new Error("[react-native-video] VideoPlayer cannot be created in SSR environment.");
    }
    const video = document.createElement("video");
    video.playsInline = true;
    const emitter = new _WebEventEmitter.WebEventEmitter(null, () => video);
    super(emitter);
    this.video = video;
    this.eventEmitter.addOnErrorListener(error => {
      this.triggerJSEvent("onError", error);
    });
    this.replaceSourceAsync(source);
  }

  /** @internal */
  __setStore(store) {
    this._store = store;
    this.eventEmitter.setStore(store);
    if (store) {
      this.mediaSession = new _MediaSession.MediaSessionHandler(store);
    } else {
      this.mediaSession?.disable();
      this.mediaSession = null;
    }
  }

  /** @internal */
  __destroy() {
    this.mediaSession?.disable();
    this.eventEmitter.destroy();
    this.clearAllEvents();
    // Store destroy calls detach internally — safe here since player is dead
    if (this._store?.destroyed === false) {
      this._store.destroy();
    }
    this._store = null;
  }

  /** @internal */
  __getMedia() {
    return this.video;
  }
  get source() {
    return {
      uri: this._source?.uri ?? "",
      config: this._source ?? {
        uri: ""
      },
      getAssetInformationAsync: async () => ({
        bitrate: NaN,
        width: this.video.videoWidth,
        height: this.video.videoHeight,
        duration: this.video.duration || NaN,
        fileSize: -1n,
        isHDR: false,
        isLive: false,
        orientation: "landscape"
      })
    };
  }

  // Store when available, video element fallback.
  // Store may provide more accurate values for HLS/DASH/DRM content.

  get status() {
    const s = this._store;
    if (s) {
      if (s.error) return "error";
      if (s.canPlay) return "readyToPlay";
      if (s.waiting) return "loading";
      if (s.source) return "loading";
      return "idle";
    }
    if (this.video.error) return "error";
    if (this.video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) return "readyToPlay";
    if (this.video.readyState > HTMLMediaElement.HAVE_NOTHING) return "loading";
    if (this.video.src) return "loading";
    return "idle";
  }
  get duration() {
    return this._store?.duration || this.video.duration || NaN;
  }
  get volume() {
    return this._store?.volume ?? this.video.volume;
  }
  set volume(v) {
    const clamped = Math.max(0, Math.min(1, v));
    if (this._store) {
      this._store.setVolume(clamped);
    } else {
      this.video.volume = clamped;
    }
  }
  get currentTime() {
    return this._store?.currentTime ?? this.video.currentTime;
  }
  set currentTime(v) {
    if (this._store) {
      this._store.seek(v);
    } else {
      this.video.currentTime = v;
    }
  }
  get muted() {
    return this._store?.muted ?? this.video.muted;
  }
  set muted(v) {
    this.video.muted = v;
  }
  get loop() {
    return this.video.loop;
  }
  set loop(v) {
    this.video.loop = v;
  }
  get rate() {
    return this._store?.playbackRate ?? this.video.playbackRate;
  }
  set rate(v) {
    if (this._store) {
      this._store.setPlaybackRate(v);
    } else {
      this.video.playbackRate = v;
    }
  }
  get mixAudioMode() {
    return "auto";
  }
  set mixAudioMode(_) {}
  get ignoreSilentSwitchMode() {
    return "auto";
  }
  set ignoreSilentSwitchMode(_) {}
  get playInBackground() {
    return true;
  }
  set playInBackground(_) {}
  get playWhenInactive() {
    return true;
  }
  set playWhenInactive(_) {}
  get isPlaying() {
    return this._store ? !this._store.paused : !this.video.paused && !this.video.ended;
  }
  get showNotificationControls() {
    return this.mediaSession?.enabled ?? false;
  }
  set showNotificationControls(value) {
    if (!this.mediaSession) return;
    if (!value) {
      this.mediaSession.disable();
      return;
    }
    this.mediaSession.enable();
    this.mediaSession.updateMediaSession(this._source?.metadata);
  }
  async initialize() {}
  async preload() {
    this.video.preload = "auto";
    this.video.load();
  }
  release() {
    this.__destroy();
  }
  play() {
    if (this._store) {
      this._store.play()?.catch(() => {});
    } else {
      this.video.play()?.catch(() => {});
    }
  }
  pause() {
    if (this._store) {
      this._store.pause();
    } else {
      this.video.pause();
    }
  }
  seekBy(time) {
    const now = this._store?.currentTime ?? this.video.currentTime;
    if (this._store) {
      this._store.seek(now + time);
    } else {
      this.video.currentTime = now + time;
    }
  }
  seekTo(time) {
    if (this._store) {
      this._store.seek(time);
    } else {
      this.video.currentTime = time;
    }
  }
  async replaceSourceAsync(source) {
    if (!source) {
      this.video.removeAttribute("src");
      this.video.load();
      this._source = undefined;
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
    if (this._store) {
      this._store.loadSource(source.uri);
    } else {
      this.video.src = source.uri;
    }
    if (this.mediaSession?.enabled) {
      this.mediaSession.updateMediaSession(source.metadata);
    }
    const existingTracks = this.video.querySelectorAll("track");
    existingTracks.forEach(t => t.remove());
    for (const sub of source.externalSubtitles ?? []) {
      const track = document.createElement("track");
      track.kind = "subtitles";
      track.src = sub.uri;
      track.srclang = sub.language ?? "und";
      track.label = sub.label;
      this.video.appendChild(track);
    }
    if (source.initializeOnCreation) await this.preload();
  }
  getAvailableTextTracks() {
    const tracks = this.video.textTracks;
    const result = [];
    for (let i = 0; i < tracks.length; i++) {
      const t = tracks[i];
      result.push({
        id: t.id || t.label,
        label: t.label,
        language: t.language,
        selected: t.mode === "showing"
      });
    }
    return result;
  }
  selectTextTrack(textTrack) {
    const tracks = this.video.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      const t = tracks[i];
      t.mode = (t.id || t.label) === textTrack?.id ? "showing" : "disabled";
    }
  }
  get selectedTrack() {
    return this.getAvailableTextTracks().find(x => x.selected);
  }
}
exports.VideoPlayer = VideoPlayer;
//# sourceMappingURL=VideoPlayer.web.js.map