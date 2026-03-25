"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPlayerEventsBase = void 0;
var _Events = require("../types/Events.js");
class VideoPlayerEventsBase {
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
  addEventListener(event, callback) {
    switch (event) {
      // ----------------- JS Events -----------------
      case 'onError':
        this.jsEventListeners.onError ??= new Set();
        this.jsEventListeners.onError.add(callback);
        return {
          remove: () => this.jsEventListeners.onError?.delete(callback)
        };
      // ----------------- Shared Events -----------------
      case 'onBuffer':
        return this.eventEmitter.addOnBufferListener(callback);
      case 'onEnd':
        return this.eventEmitter.addOnEndListener(callback);
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
      case 'onTrackChange':
        return this.eventEmitter.addOnTrackChangeListener(callback);
      case 'onVolumeChange':
        return this.eventEmitter.addOnVolumeChangeListener(callback);
      case 'onStatusChange':
        return this.eventEmitter.addOnStatusChangeListener(callback);
      default:
        throw new Error(`[React Native Video] Unsupported event: ${event}`);
    }
  }
  clearAllEvents() {
    this.jsEventListeners = {};
    this.eventEmitter.clearAllListeners();
  }
}
exports.VideoPlayerEventsBase = VideoPlayerEventsBase;
//# sourceMappingURL=VideoPlayerEventsBase.js.map