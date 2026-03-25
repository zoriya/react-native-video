"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPlayerEvents = void 0;
var _VideoPlayerEventsBase = require("./VideoPlayerEventsBase.js");
class VideoPlayerEvents extends _VideoPlayerEventsBase.VideoPlayerEventsBase {
  addEventListener(event, callback) {
    switch (event) {
      // ----------------- Native-only Events -----------------
      case 'onAudioBecomingNoisy':
        return this.eventEmitter.addOnAudioBecomingNoisyListener(callback);
      case 'onAudioFocusChange':
        return this.eventEmitter.addOnAudioFocusChangeListener(callback);
      case 'onBandwidthUpdate':
        return this.eventEmitter.addOnBandwidthUpdateListener(callback);
      case 'onControlsVisibleChange':
        return this.eventEmitter.addOnControlsVisibleChangeListener(callback);
      case 'onExternalPlaybackChange':
        return this.eventEmitter.addOnExternalPlaybackChangeListener(callback);
      case 'onTimedMetadata':
        return this.eventEmitter.addOnTimedMetadataListener(callback);
      case 'onTextTrackDataChanged':
        return this.eventEmitter.addOnTextTrackDataChangedListener(callback);
      default:
        return super.addEventListener(event, callback);
    }
  }
}
exports.VideoPlayerEvents = VideoPlayerEvents;
//# sourceMappingURL=VideoPlayerEvents.native.js.map