"use strict";

import shaka from "shaka-player";
import { tryParseNativeVideoError, VideoRuntimeError } from "./types/VideoError.js";
import { VideoPlayerEvents } from "./VideoPlayerEvents.js";
import { WebEventEmiter } from "./WebEventEmiter.js";
class VideoPlayer extends VideoPlayerEvents {
  player = new shaka.Player();
  headers = {};
  constructor(source) {
    const video = document.createElement("video");
    super(new WebEventEmiter(video));
    this.video = video;
    this.player.attach(this.video);
    this.player.getNetworkingEngine().registerRequestFilter((_type, request) => {
      request.headers = this.headers;
    });
    this.replaceSourceAsync(source);
  }

  /**
   * Cleans up player's native resources and releases native state.
   * After calling this method, the player is no longer usable.
   * @internal
   */
  __destroy() {
    this.player.destroy();
  }
  __getNativeRef() {
    return this.video;
  }

  /**
   * Handles parsing native errors to VideoRuntimeError and calling onError if provided
   * @internal
   */
  throwError(error) {
    const parsedError = tryParseNativeVideoError(error);
    if (parsedError instanceof VideoRuntimeError && this.triggerEvent("onError", parsedError)) {
      // We don't throw errors if onError is provided
      return;
    }
    throw parsedError;
  }

  // Source
  get source() {
    // TODO: properly implement this
    return {
      uri: this.player.getAssetUri(),
      config: {}
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
    return this.video.duration;
  }

  // Volume
  get volume() {
    return this.video.volume;
  }
  set volume(value) {
    this.video.volume = value;
  }

  // Current Time
  get currentTime() {
    return this.video.currentTime;
  }
  set currentTime(value) {
    this.video.currentTime = value;
  }

  // Muted
  get muted() {
    return this.video.muted;
  }
  set muted(value) {
    this.video.muted = value;
  }

  // Loop
  get loop() {
    return this.video.loop;
  }
  set loop(value) {
    this.video.loop = value;
  }

  // Rate
  get rate() {
    return this.video.playbackRate;
  }
  set rate(value) {
    this.video.playbackRate = value;
  }

  // Mix Audio Mode
  get mixAudioMode() {
    return "auto";
  }
  set mixAudioMode(_) {
    if (__DEV__) {
      console.warn("mixAudioMode is not supported on this platform, it wont have any effect");
    }
  }

  // Ignore Silent Switch Mode
  get ignoreSilentSwitchMode() {
    return "auto";
  }
  set ignoreSilentSwitchMode(_) {
    if (__DEV__) {
      console.warn("ignoreSilentSwitchMode is not supported on this platform, it wont have any effect");
    }
  }

  // Play In Background
  get playInBackground() {
    return true;
  }
  set playInBackground(_) {
    if (__DEV__) {
      console.warn("playInBackground is not supported on this platform, it wont have any effect");
    }
  }

  // Play When Inactive
  get playWhenInactive() {
    return true;
  }
  set playWhenInactive(_) {
    if (__DEV__) {
      console.warn("playWhenInactive is not supported on this platform, it wont have any effect");
    }
  }

  // Is Playing
  get isPlaying() {
    return this.status === "readyToPlay" && !this.video.paused;
  }
  async initialize() {
    // noop on web
  }
  async preload() {
    // we start loading when initializing the source.
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
      this.video.play();
    } catch (error) {
      this.throwError(error);
    }
  }
  pause() {
    try {
      this.video.pause();
    } catch (error) {
      this.throwError(error);
    }
  }
  seekBy(time) {
    try {
      this.video.currentTime += time;
    } catch (error) {
      this.throwError(error);
    }
  }
  seekTo(time) {
    try {
      this.video.currentTime = time;
    } catch (error) {
      this.throwError(error);
    }
  }
  async replaceSourceAsync(source) {
    const src = typeof source === "object" && source && "uri" in source ? source.uri : source;
    if (typeof src === "number") {
      console.error("A source uri must be a string. Numbers are only supported on native.");
      return;
    }
    // TODO: handle start time
    this.player.load(src);
    if (typeof source !== "object") return;
    this.headers = source?.headers ?? {};
    // this.player.configure({
    //     drm: undefined,
    //     streaming: {
    //       bufferingGoal: source?.bufferConfig?.maxBufferMs,
    //     },
    // } satisfies Partial<shaka.extern.PlayerConfiguration>);
  }

  // Text Track Management
  getAvailableTextTracks() {
    return this.player.getTextTracks().map(x => ({
      id: x.id.toString(),
      label: x.label ?? "",
      language: x.language,
      selected: x.active
    }));
  }
  selectTextTrack(textTrack) {
    this.player.setTextTrackVisibility(textTrack !== null);
    if (!textTrack) return;
    const track = this.player.getTextTracks().find(x => x.id === Number(textTrack.id));
    if (track) this.player.selectTextTrack(track);
  }

  // Selected Text Track
  get selectedTrack() {
    return this.getAvailableTextTracks().find(x => x.selected);
  }
}
export { VideoPlayer };
//# sourceMappingURL=VideoPlayer.web.js.map