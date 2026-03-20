"use strict";

function allKeysOf() {
  return (...arr) => {
    return arr;
  };
}
export const ALL_PLAYER_EVENTS = allKeysOf()('onAudioBecomingNoisy', 'onAudioFocusChange', 'onAudioTrackChange', 'onBandwidthUpdate', 'onBuffer', 'onControlsVisibleChange', 'onEnd', 'onError', 'onExternalPlaybackChange', 'onLoad', 'onLoadStart', 'onPlaybackStateChange', 'onPlaybackRateChange', 'onProgress', 'onQualityChange', 'onReadyToDisplay', 'onSeek', 'onTimedMetadata', 'onTextTrackDataChanged', 'onTrackChange', 'onVolumeChange', 'onVideoTrackChange', 'onStatusChange');
export const ALL_VIEW_EVENTS = allKeysOf()('onPictureInPictureChange', 'onFullscreenChange', 'willEnterFullscreen', 'willExitFullscreen', 'willEnterPictureInPicture', 'willExitPictureInPicture');
//# sourceMappingURL=Events.js.map