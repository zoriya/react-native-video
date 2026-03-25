import type { AllPlayerEvents } from '../types/Events';
import type { VideoPlayer } from '../VideoPlayer';
/**
 * Attaches an event listener to a `VideoPlayer` instance for a specified event.
 *
 * @param player - The player to attach the event to
 * @param event - The name of the event to attach the callback to
 * @param callback - The callback for the event
 */
export declare const useEvent: <T extends keyof AllPlayerEvents>(player: VideoPlayer, event: T, callback: AllPlayerEvents[T]) => void;
//# sourceMappingURL=useEvent.d.ts.map