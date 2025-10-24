import type { HybridObject } from 'react-native-nitro-modules';
import type { VideoPlayerEvents } from '../../core/types/Events';
/**
 * The holder of the video player events.
 * @platform iOS
 * @platform android
 */
export interface VideoPlayerEventEmitter extends HybridObject<{
    ios: 'swift';
    android: 'kotlin';
}>, VideoPlayerEvents {
}
//# sourceMappingURL=VideoPlayerEventEmitter.nitro.d.ts.map