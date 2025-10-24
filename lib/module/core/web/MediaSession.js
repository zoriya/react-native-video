"use strict";

const mediaSession = window.navigator.mediaSession;
export class MediaSessionHandler {
  enabled = false;
  constructor(player) {
    this.player = player;
  }
  enable() {
    this.enabled = true;
    const defaultSkipTime = 15;
    const actionHandlers = [["play", () => {
      this.player.play();
    }], ["pause", () => {
      this.player.pause();
    }], ["stop", () => {
      this.player.pause();
      this.player.currentTime(0);
    }],
    // videojs-contrib-ads
    ["seekbackward", details => {
      // @ts-expect-error ads is in an optional plugin that isn't typed.
      if (this.player.usingPlugin("ads") && this.player.ads.inAdBreak()) {
        return;
      }
      this.player.currentTime(Math.max(0, (this.player.currentTime() ?? 0) - (details.seekOffset || defaultSkipTime)));
    }], ["seekforward", details => {
      // @ts-expect-error ads is in an optional plugin that isn't typed.
      if (this.player.usingPlugin("ads") && this.player.ads.inAdBreak()) {
        return;
      }
      this.player.currentTime(Math.min(this.player.duration() ?? 0, (this.player.currentTime() ?? 0) + (details.seekOffset || defaultSkipTime)));
    }], ["seekto", details => {
      // @ts-expect-error ads is in an optional plugin that isn't typed.
      if (this.player.usingPlugin("ads") && this.player.ads.inAdBreak()) {
        return;
      }
      this.player.currentTime(details.seekTime);
    }]];
    for (const [action, handler] of actionHandlers) {
      try {
        mediaSession.setActionHandler(action, handler);
      } catch {
        this.player.log.debug(`Couldn't register media session action "${action}".`);
      }
    }
    const onPlaying = () => {
      mediaSession.playbackState = "playing";
    };
    const onPaused = () => {
      mediaSession.playbackState = "paused";
    };
    const onTimeUpdate = () => {
      const dur = this.player.duration();
      if (Number.isFinite(dur)) {
        mediaSession.setPositionState({
          duration: dur,
          playbackRate: this.player.playbackRate(),
          position: this.player.currentTime()
        });
      }
    };
    this.player.on("playing", onPlaying);
    this.player.on("paused", onPaused);
    if ("setPositionState" in mediaSession) {
      this.player.on("timeupdate", onTimeUpdate);
    }
    this.disable = () => {
      this.enabled = false;
      this.player.off("playing", onPlaying);
      this.player.off("paused", onPaused);
      if ("setPositionState" in mediaSession) {
        this.player.off("timeupdate", onTimeUpdate);
      }
      mediaSession.metadata = null;
      for (const [action, _] of actionHandlers) {
        try {
          mediaSession.setActionHandler(action, null);
        } catch {}
      }
    };
  }
  disable() {}
  updateMediaSession(metadata) {
    if (!metadata) {
      mediaSession.metadata = null;
      return;
    }
    mediaSession.metadata = new window.MediaMetadata({
      title: metadata.title,
      album: metadata.subtitle,
      artist: metadata.artist,
      artwork: metadata.imageUri ? [{
        src: metadata.imageUri
      }] : []
    });
  }
}
//# sourceMappingURL=MediaSession.js.map