"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPlayerEvents = void 0;
var _Events = require("./types/Events.js");
var _reactNative = require("react-native");
class VideoPlayerEvents {
  jsEventListeners = {};
  supportedEvents = _Events.ALL_PLAYER_EVENTS;
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
  }
  triggerJSEvent(event, ...params) {
    if (!this.jsEventListeners[event]) return false;
    this.jsEventListeners[event]?.forEach(fn => fn(...params));
    return true;
  }

  /**
   * Adds a listener for a player event.
   * @throw Error if the event is not supported.
   * @param event - The event to add a listener for.
   * @param callback - The callback to call when the event is triggered.
   * @returns A subscription object that can be used to remove the listener.
   */
  addEventListener(event, callback) {
    switch (event) {
      // ----------------- JS Events -----------------
      case 'onError':
        this.jsEventListeners.onError ??= new Set();
        this.jsEventListeners.onError.add(callback);
        return {
          remove: () => this.jsEventListeners.onError?.delete(callback)
        };
      // ----------------- Native Events -----------------
      case 'onAudioBecomingNoisy':
        return this.eventEmitter.addOnAudioBecomingNoisyListener(callback);
      case 'onAudioFocusChange':
        return this.eventEmitter.addOnAudioFocusChangeListener(callback);
      case 'onBandwidthUpdate':
        return this.eventEmitter.addOnBandwidthUpdateListener(callback);
      case 'onBuffer':
        return this.eventEmitter.addOnBufferListener(callback);
      case 'onControlsVisibleChange':
        return this.eventEmitter.addOnControlsVisibleChangeListener(callback);
      case 'onEnd':
        return this.eventEmitter.addOnEndListener(callback);
      case 'onExternalPlaybackChange':
        return this.eventEmitter.addOnExternalPlaybackChangeListener(callback);
      case 'onLoad':
        return this.eventEmitter.addOnLoadListener(callback);
      case 'onLoadStart':
        return this.eventEmitter.addOnLoadStartListener(callback);
      case 'onPlaybackStateChange':
        return this.eventEmitter.addOnPlaybackStateChangeListener(callback);
      case 'onPlaybackRateChange':
        return this.eventEmitter.addOnPlaybackRateChangeListener(callback);
      case 'onProgress':
        return this.eventEmitter.addOnProgressListener(callback);
      case 'onReadyToDisplay':
        return this.eventEmitter.addOnReadyToDisplayListener(callback);
      case 'onSeek':
        return this.eventEmitter.addOnSeekListener(callback);
      case 'onTimedMetadata':
        return this.eventEmitter.addOnTimedMetadataListener(callback);
      case 'onTextTrackDataChanged':
        return this.eventEmitter.addOnTextTrackDataChangedListener(callback);
      case 'onTrackChange':
        return this.eventEmitter.addOnTrackChangeListener(callback);
      case 'onVolumeChange':
        return this.eventEmitter.addOnVolumeChangeListener(callback);
      case 'onStatusChange':
        return this.eventEmitter.addOnStatusChangeListener(callback);
      // ----------------- Web Events -----------------
      case 'onAudioTrackChange':
        if (_reactNative.Platform.OS !== "web") return {
          remove: () => {}
        };
        return this.eventEmitter.addOnAudioTrackChangeListener(callback);
      case 'onVideoTrackChange':
        if (_reactNative.Platform.OS !== "web") return {
          remove: () => {}
        };
        return this.eventEmitter.addOnVideoTrackChangeListener(callback);
      case 'onQualityChange':
        if (_reactNative.Platform.OS !== "web") return {
          remove: () => {}
        };
        return this.eventEmitter.addOnQualityChangeListener(callback);
      default:
        throw new Error(`[React Native Video] Unsupported event: ${event}`);
    }
  }

  /**
   * Clears all events from the event emitter.
   */
  clearAllEvents() {
    this.jsEventListeners = {};
    this.eventEmitter.clearAllListeners();
  }
}
exports.VideoPlayerEvents = VideoPlayerEvents;
//# sourceMappingURL=VideoPlayerEvents.js.map