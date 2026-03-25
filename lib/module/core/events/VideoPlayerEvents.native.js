"use strict";

import { VideoPlayerEventsBase } from "./VideoPlayerEventsBase.js";
export class VideoPlayerEvents extends VideoPlayerEventsBase {
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
//# sourceMappingURL=VideoPlayerEvents.native.js.map