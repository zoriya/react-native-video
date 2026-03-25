import type { VideoPlayerSource } from '../../spec/nitro/VideoPlayerSource.nitro';
import type { NoAutocomplete } from '../types/Utils';
import type { VideoConfig, VideoSource } from '../types/VideoConfig';
import { VideoPlayer } from '../VideoPlayer';
/**
 * Creates a `VideoPlayer` instance and manages its lifecycle.
 *
 * if `initializeOnCreation` is true (default), the `setup` function will be called when the player is started loading source.
 * if `initializeOnCreation` is false, the `setup` function will be called when the player is created. changes made to player made before initializing will be overwritten when initializing.
 *
 * @param source - The source of the video to play
 * @param setup - A function to setup the player
 * @returns The `VideoPlayer` instance
 */
export declare const useVideoPlayer: (source: VideoConfig | VideoSource | NoAutocomplete<VideoPlayerSource>, setup?: (player: VideoPlayer) => void) => VideoPlayer;
//# sourceMappingURL=useVideoPlayer.d.ts.map