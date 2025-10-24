"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ALL_PLAYER_EVENTS = void 0;
function allKeysOf() {
  return (...arr) => {
    return arr;
  };
}
const ALL_PLAYER_EVENTS = exports.ALL_PLAYER_EVENTS = allKeysOf()('onAudioBecomingNoisy', 'onAudioFocusChange', 'onAudioTrackChange', 'onBandwidthUpdate', 'onBuffer', 'onControlsVisibleChange', 'onEnd', 'onError', 'onExternalPlaybackChange', 'onLoad', 'onLoadStart', 'onPlaybackStateChange', 'onPlaybackRateChange', 'onProgress', 'onQualityChange', 'onReadyToDisplay', 'onSeek', 'onTimedMetadata', 'onTextTrackDataChanged', 'onTrackChange', 'onVolumeChange', 'onVideoTrackChange', 'onStatusChange');
//# sourceMappingURL=Events.js.map