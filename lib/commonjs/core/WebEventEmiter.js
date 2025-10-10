"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebEventEmiter = void 0;
class WebEventEmiter {
  _isBuferring = false;
  constructor(video) {
    this.video = video;
    // TODO: add `onBandwithUpdate`

    // on buffer
    this.video.addEventListener("canplay", this._onCanPlay);
    this.video.addEventListener("waiting", this._onWaiting);

    // on end
    this.video.addEventListener("ended", this._onEnded);

    // on load
    this.video.addEventListener("durationchange", this._onDurationChange);

    // on load start
    this.video.addEventListener("loadstart", this._onLoadStart);

    // on playback state change
    this.video.addEventListener("play", this._onPlay);
    this.video.addEventListener("pause", this._onPause);

    // on playback rate change
    this.video.addEventListener("ratechange", this._onRateChange);

    // on progress
    this.video.addEventListener("timeupdate", this._onTimeUpdate);

    // on ready to play
    this.video.addEventListener("loadeddata", this._onLoadedData);

    // on seek
    this.video.addEventListener("seeked", this._onSeeked);

    // on volume change
    this.video.addEventListener("volumechange", this._onVolumeChange);

    // on status change
    this.video.addEventListener("error", this._onError);
  }
  destroy() {
    this.video.removeEventListener("canplay", this._onCanPlay);
    this.video.removeEventListener("waiting", this._onWaiting);
    this.video.removeEventListener("ended", this._onEnded);
    this.video.removeEventListener("durationchange", this._onDurationChange);
    this.video.removeEventListener("play", this._onPlay);
    this.video.removeEventListener("pause", this._onPause);
    this.video.removeEventListener("ratechange", this._onRateChange);
    this.video.removeEventListener("timeupdate", this._onTimeUpdate);
    this.video.removeEventListener("loadeddata", this._onLoadedData);
    this.video.removeEventListener("seeked", this._onSeeked);
    this.video.removeEventListener("volumechange", this._onVolumeChange);
    this.video.removeEventListener("error", this._onError);
  }
  _onTimeUpdate() {
    this.onProgress({
      currentTime: this.video.currentTime,
      bufferDuration: this.video.buffered.length ? this.video.buffered.end(this.video.buffered.length - 1) : 0
    });
  }
  _onCanPlay() {
    this._isBuferring = false;
    this.onBuffer(false);
    this.onStatusChange("readyToPlay");
  }
  _onWaiting() {
    this._isBuferring = true;
    this.onBuffer(true);
    this.onStatusChange("loading");
  }
  _onDurationChange() {
    this.onLoad({
      currentTime: this.video.currentTime,
      duration: this.video.duration,
      width: this.video.width,
      height: this.video.height,
      orientation: "unknown"
    });
  }
  _onEnded() {
    this.onEnd();
    this.onStatusChange("idle");
  }
  _onLoadStart() {
    this.onLoadStart({
      sourceType: "network",
      source: {
        uri: this.video.currentSrc,
        config: {
          uri: this.video.currentSrc,
          externalSubtitles: []
        },
        getAssetInformationAsync: async () => {
          return {
            duration: BigInt(this.video.duration),
            height: this.video.height,
            width: this.video.width,
            orientation: "unknown",
            bitrate: NaN,
            fileSize: BigInt(NaN),
            isHDR: false,
            isLive: false
          };
        }
      }
    });
  }
  _onPlay() {
    this.onPlaybackStateChange({
      isPlaying: true,
      isBuffering: this._isBuferring
    });
  }
  _onPause() {
    this.onPlaybackStateChange({
      isPlaying: false,
      isBuffering: this._isBuferring
    });
  }
  _onRateChange() {
    this.onPlaybackRateChange(this.video.playbackRate);
  }
  _onLoadedData() {
    this.onReadyToDisplay();
  }
  _onSeeked() {
    this.onSeek(this.video.currentTime);
  }
  _onVolumeChange() {
    this.onVolumeChange({
      muted: this.video.muted,
      volume: this.video.volume
    });
  }
  _onError() {
    this.onStatusChange("error");
  }
  NOOP = () => {};
  onError = this.NOOP;
  onAudioBecomingNoisy = this.NOOP;
  onAudioFocusChange = this.NOOP;
  onBandwidthUpdate = this.NOOP;
  onBuffer = this.NOOP;
  onControlsVisibleChange = this.NOOP;
  onEnd = this.NOOP;
  onExternalPlaybackChange = this.NOOP;
  onLoad = this.NOOP;
  onLoadStart = this.NOOP;
  onPlaybackStateChange = this.NOOP;
  onPlaybackRateChange = this.NOOP;
  onProgress = this.NOOP;
  onReadyToDisplay = this.NOOP;
  onSeek = this.NOOP;
  onTimedMetadata = this.NOOP;
  onTextTrackDataChanged = this.NOOP;
  onTrackChange = this.NOOP;
  onVolumeChange = this.NOOP;
  onStatusChange = this.NOOP;
}
exports.WebEventEmiter = WebEventEmiter;
//# sourceMappingURL=WebEventEmiter.js.map