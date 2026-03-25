"use strict";

import { VideoError } from "../types/VideoError.js";

/**
 * video.js store interface — optional, used for enhanced buffering info when available.
 */

/**
 * WebEventEmitter bridges HTML5 media events to our event system.
 * Works with or without a video.js store — video element events are the primary source.
 * When a video.js store is connected, it provides enhanced buffering info.
 */
export class WebEventEmitter {
  _listeners = new Map();
  _mediaCleanup = null;
  _storeUnsubscribe = null;
  _store = null;
  _isBuffering = false;
  constructor(store, getMedia) {
    this.getMedia = getMedia;
    // Attach to video element immediately if available
    this._attachMediaListeners();
    if (store) this.setStore(store);
  }

  /**
   * Connect or disconnect the video.js store (optional enhancement).
   */
  setStore(store) {
    this._storeUnsubscribe?.();
    this._storeUnsubscribe = null;
    this._store = store;
  }
  destroy() {
    this._storeUnsubscribe?.();
    this._storeUnsubscribe = null;
    this._mediaCleanup?.();
    this._mediaCleanup = null;
  }
  _attachMediaListeners() {
    const video = this.getMedia();
    if (!video) return;
    const on = (event, handler) => {
      video.addEventListener(event, handler);
      return () => video.removeEventListener(event, handler);
    };
    const cleanups = [];
    cleanups.push(on("play", () => {
      this._emit("onPlaybackStateChange", {
        isPlaying: true,
        isBuffering: this._isBuffering
      });
    }));
    cleanups.push(on("pause", () => {
      this._emit("onPlaybackStateChange", {
        isPlaying: false,
        isBuffering: this._isBuffering
      });
    }));
    cleanups.push(on("waiting", () => {
      this._isBuffering = true;
      this._emit("onBuffer", true);
      this._emit("onStatusChange", "loading");
    }));
    cleanups.push(on("canplay", () => {
      this._isBuffering = false;
      this._emit("onBuffer", false);
      this._emit("onStatusChange", "readyToPlay");
    }));
    cleanups.push(on("timeupdate", () => {
      const buffered = video.buffered;
      const lastBuffered = buffered.length > 0 ? buffered.end(buffered.length - 1) : 0;
      this._emit("onProgress", {
        currentTime: video.currentTime,
        bufferDuration: lastBuffered
      });
    }));
    cleanups.push(on("durationchange", () => {
      if (video.duration > 0) {
        this._emit("onLoad", {
          currentTime: video.currentTime,
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
          orientation: "unknown"
        });
      }
    }));
    cleanups.push(on("ended", () => {
      this._emit("onEnd");
      this._emit("onStatusChange", "idle");
    }));
    cleanups.push(on("ratechange", () => {
      this._emit("onPlaybackRateChange", video.playbackRate);
    }));
    cleanups.push(on("loadeddata", () => {
      this._emit("onReadyToDisplay");
    }));
    cleanups.push(on("seeked", () => {
      this._emit("onSeek", video.currentTime);
    }));
    cleanups.push(on("volumechange", () => {
      this._emit("onVolumeChange", {
        volume: video.volume,
        muted: video.muted
      });
    }));
    cleanups.push(on("loadstart", () => {
      this._emit("onLoadStart", {
        sourceType: "network",
        source: {
          uri: video.currentSrc || video.src,
          config: {
            uri: video.currentSrc || video.src,
            externalSubtitles: []
          },
          getAssetInformationAsync: async () => ({
            duration: video.duration || NaN,
            width: video.videoWidth,
            height: video.videoHeight,
            orientation: "unknown",
            bitrate: NaN,
            fileSize: -1n,
            isHDR: false,
            isLive: false
          })
        }
      });
    }));
    cleanups.push(on("error", () => {
      this._emit("onStatusChange", "error");
      const err = video.error;
      if (!err) {
        console.error("Unknown error occurred in player");
        return;
      }
      const codeMap = {
        1: "player/asset-not-initialized",
        2: "player/not-initialized",
        3: "player/invalid-source",
        4: "source/unsupported-content-type"
      };
      this._emit("onError", new VideoError(codeMap[err.code] ?? "unknown/unknown", err.message));
    }));
    this._mediaCleanup = () => {
      cleanups.forEach(fn => fn());
    };
  }

  // --- Listener infrastructure ---

  _addListener(event, listener) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event).add(listener);
    return {
      remove: () => {
        this._listeners.get(event)?.delete(listener);
      }
    };
  }
  _emit(event, ...args) {
    this._listeners.get(event)?.forEach(fn => fn(...args));
  }

  // --- Listener registration (implements VideoPlayerEventEmitterBase) ---

  addOnAudioBecomingNoisyListener(listener) {
    return this._addListener("onAudioBecomingNoisy", listener);
  }
  addOnAudioFocusChangeListener(listener) {
    return this._addListener("onAudioFocusChange", listener);
  }
  addOnBandwidthUpdateListener(listener) {
    return this._addListener("onBandwidthUpdate", listener);
  }
  addOnBufferListener(listener) {
    return this._addListener("onBuffer", listener);
  }
  addOnControlsVisibleChangeListener(listener) {
    return this._addListener("onControlsVisibleChange", listener);
  }
  addOnEndListener(listener) {
    return this._addListener("onEnd", listener);
  }
  addOnExternalPlaybackChangeListener(listener) {
    return this._addListener("onExternalPlaybackChange", listener);
  }
  addOnLoadListener(listener) {
    return this._addListener("onLoad", listener);
  }
  addOnLoadStartListener(listener) {
    return this._addListener("onLoadStart", listener);
  }
  addOnPlaybackStateChangeListener(listener) {
    return this._addListener("onPlaybackStateChange", listener);
  }
  addOnPlaybackRateChangeListener(listener) {
    return this._addListener("onPlaybackRateChange", listener);
  }
  addOnProgressListener(listener) {
    return this._addListener("onProgress", listener);
  }
  addOnReadyToDisplayListener(listener) {
    return this._addListener("onReadyToDisplay", listener);
  }
  addOnSeekListener(listener) {
    return this._addListener("onSeek", listener);
  }
  addOnStatusChangeListener(listener) {
    return this._addListener("onStatusChange", listener);
  }
  addOnTimedMetadataListener(listener) {
    return this._addListener("onTimedMetadata", listener);
  }
  addOnTextTrackDataChangedListener(listener) {
    return this._addListener("onTextTrackDataChanged", listener);
  }
  addOnTrackChangeListener(listener) {
    return this._addListener("onTrackChange", listener);
  }
  addOnVolumeChangeListener(listener) {
    return this._addListener("onVolumeChange", listener);
  }
  clearAllListeners() {
    this._listeners.clear();
  }
  addOnErrorListener(listener) {
    return this._addListener("onError", listener);
  }
}
//# sourceMappingURL=WebEventEmitter.js.map