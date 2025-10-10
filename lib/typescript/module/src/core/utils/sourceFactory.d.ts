import type { VideoPlayerSource } from '../../spec/nitro/VideoPlayerSource.nitro';
import type { VideoConfig, VideoSource } from '../types/VideoConfig';
/**
 * Creates a `VideoPlayerSource` instance from a URI (string).
 *
 * @param uri - The URI of the video to play
 * @returns The `VideoPlayerSource` instance
 */
export declare const createSourceFromUri: (uri: string) => VideoPlayerSource;
/**
 * Creates a `VideoPlayerSource` instance from a `VideoConfig`.
 *
 * @note The `uri` property is required to be a string.
 *
 * @param config - The `VideoConfig` to create the `VideoPlayerSource` from
 * @returns The `VideoPlayerSource` instance
 */
export declare const createSourceFromVideoConfig: (config: VideoConfig & {
    uri: string;
}) => VideoPlayerSource;
/**
 * Creates a `VideoPlayerSource`
 *
 * @param source - The `VideoSource` to create the `VideoPlayerSource` from
 * @returns The `VideoPlayerSource` instance
 */
export declare const createSource: (source: VideoSource | VideoConfig | VideoPlayerSource) => VideoPlayerSource;
//# sourceMappingURL=sourceFactory.d.ts.map