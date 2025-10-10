"use strict";

function allKeysOf() {
  return (...arr) => {
    return arr;
  };
}
export const ALL_PLAYER_EVENTS = allKeysOf()('onAudioBecomingNoisy', 'onAudioFocusChange', 'onBandwidthUpdate', 'onBuffer', 'onControlsVisibleChange', 'onEnd', 'onError', 'onExternalPlaybackChange', 'onLoad', 'onLoadStart', 'onPlaybackStateChange', 'onPlaybackRateChange', 'onProgress', 'onReadyToDisplay', 'onSeek', 'onTimedMetadata', 'onTextTrackDataChanged', 'onTrackChange', 'onVolumeChange', 'onStatusChange');
//# sourceMappingURL=Events.js.map