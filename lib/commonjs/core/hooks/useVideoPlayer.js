"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVideoPlayer = void 0;
var _sourceUtils = require("../utils/sourceUtils.js");
var _VideoPlayer = require("../VideoPlayer");
var _useManagedInstance = require("./useManagedInstance.js");
const sourceEqual = (a, b) => {
  if ((0, _sourceUtils.isVideoPlayerSource)(a) && (0, _sourceUtils.isVideoPlayerSource)(b)) {
    return a.equals(b);
  }
  return JSON.stringify(a) === JSON.stringify(b);
};

/**
 * Creates a `VideoPlayer` instance and manages its lifecycle.
 *
 * @param source - The source of the video to play
 * @param setup - A function to setup the player
 * @returns The `VideoPlayer` instance
 */
const useVideoPlayer = (source, setup) => {
  return (0, _useManagedInstance.useManagedInstance)({
    factory: () => {
      const player = new _VideoPlayer.VideoPlayer(source);
      setup?.(player);
      return player;
    },
    cleanup: player => {
      player.__destroy();
    },
    dependenciesEqualFn: sourceEqual
  }, [JSON.stringify(source)]);
};
exports.useVideoPlayer = useVideoPlayer;
//# sourceMappingURL=useVideoPlayer.js.map