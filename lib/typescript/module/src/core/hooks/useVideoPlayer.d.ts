import type { VideoPlayerSource } from '../../spec/nitro/VideoPlayerSource.nitro';
import type { NoAutocomplete } from '../types/Utils';
import type { VideoConfig, VideoSource } from '../types/VideoConfig';
import { VideoPlayer } from '../VideoPlayer';
/**
 * Creates a `VideoPlayer` instance and manages its lifecycle.
 *
 * @param source - The source of the video to play
 * @param setup - A function to setup the player
 * @returns The `VideoPlayer` instance
 */
export declare const useVideoPlayer: (source: VideoConfig | VideoSource | NoAutocomplete<VideoPlayerSource>, setup?: (player: VideoPlayer) => void) => VideoPlayer;
//# sourceMappingURL=useVideoPlayer.d.ts.map