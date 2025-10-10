"use strict";

import { NitroModules } from 'react-native-nitro-modules';
import { createSource } from "./sourceFactory.js";
import { tryParseNativeVideoError } from "../types/VideoError.js";
import { isVideoPlayerSource } from "./sourceUtils.js";
const VideoPlayerFactory = NitroModules.createHybridObject('VideoPlayerFactory');

/**
 * @internal
 * Creates a Native VideoPlayer instance.
 *
 * @param source - The source of the video to play
 * @returns The Native VideoPlayer instance
 */
export const createPlayer = source => {
  try {
    if (isVideoPlayerSource(source)) {
      return VideoPlayerFactory.createPlayer(source);
    }
    return VideoPlayerFactory.createPlayer(createSource(source));
  } catch (error) {
    throw tryParseNativeVideoError(error);
  }
};
//# sourceMappingURL=playerFactory.js.map