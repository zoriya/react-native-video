"use strict";

function allKeysOf() {
  return (...arr) => {
    return arr;
  };
}
export const ALL_PLAYER_EVENTS = allKeysOf()('onAudioBecomingNoisy', 'onAudioFocusChange', 'onBandwidthUpdate', 'onBuffer', 'onControlsVisibleChange', 'onEnd', 'onError', 'onExternalPlaybackChange', 'onLoad', 'onLoadStart', 'onPlaybackStateChange', 'onPlaybackRateChange', 'onProgress', 'onReadyToDisplay', 'onSeek', 'onTimedMetadata', 'onTextTrackDataChanged', 'onTrackChange', 'onVolumeChange', 'onStatusChange');
export const ALL_VIEW_EVENTS = allKeysOf()('onPictureInPictureChange', 'onFullscreenChange', 'willEnterFullscreen', 'willExitFullscreen', 'willEnterPictureInPicture', 'willExitPictureInPicture');
//# sourceMappingURL=Events.js.map