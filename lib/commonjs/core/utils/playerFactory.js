"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPlayer = void 0;
var _reactNativeNitroModules = require("react-native-nitro-modules");
var _sourceFactory = require("./sourceFactory.js");
var _VideoError = require("../types/VideoError.js");
var _sourceUtils = require("./sourceUtils.js");
const VideoPlayerFactory = _reactNativeNitroModules.NitroModules.createHybridObject('VideoPlayerFactory');

/**
 * @internal
 * Creates a Native VideoPlayer instance.
 *
 * @param source - The source of the video to play
 * @returns The Native VideoPlayer instance
 */
const createPlayer = source => {
  try {
    if ((0, _sourceUtils.isVideoPlayerSource)(source)) {
      return VideoPlayerFactory.createPlayer(source);
    }
    return VideoPlayerFactory.createPlayer((0, _sourceFactory.createSource)(source));
  } catch (error) {
    throw (0, _VideoError.tryParseNativeVideoError)(error);
  }
};
exports.createPlayer = createPlayer;
//# sourceMappingURL=playerFactory.js.map