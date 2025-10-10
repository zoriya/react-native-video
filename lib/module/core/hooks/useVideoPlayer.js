"use strict";

import { isVideoPlayerSource } from "../utils/sourceUtils.js";
import { VideoPlayer } from '../VideoPlayer';
import { useManagedInstance } from "./useManagedInstance.js";
const sourceEqual = (a, b) => {
  if (isVideoPlayerSource(a) && isVideoPlayerSource(b)) {
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
export const useVideoPlayer = (source, setup) => {
  return useManagedInstance({
    factory: () => {
      const player = new VideoPlayer(source);
      setup?.(player);
      return player;
    },
    cleanup: player => {
      player.__destroy();
    },
    dependenciesEqualFn: sourceEqual
  }, [JSON.stringify(source)]);
};
//# sourceMappingURL=useVideoPlayer.js.map