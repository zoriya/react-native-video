import { type JSVideoPlayerEvents, type AllPlayerEvents as PlayerEvents } from "./types/Events";
import type { ListenerSubscription, VideoPlayerEventEmitterBase } from "./types/EventEmitter";
export declare class VideoPlayerEvents {
    protected eventEmitter: VideoPlayerEventEmitterBase;
    protected jsEventListeners: Partial<Record<keyof JSVideoPlayerEvents, Set<(..._params: any[]) => void>>>;
    protected readonly supportedEvents: (keyof PlayerEvents)[];
    constructor(eventEmitter: VideoPlayerEventEmitterBase);
    protected triggerJSEvent<Event extends keyof JSVideoPlayerEvents>(event: Event, ...params: Parameters<JSVideoPlayerEvents[Event]>): boolean;
    /**
     * Adds a listener for a player event.
     * @throw Error if the event is not supported.
     * @param event - The event to add a listener for.
     * @param callback - The callback to call when the event is triggered.
     * @returns A subscription object that can be used to remove the listener.
     */
    addEventListener<Event extends keyof PlayerEvents>(event: Event, callback: PlayerEvents[Event]): ListenerSubscription;
    /**
     * Clears all events from the event emitter.
     */
    clearAllEvents(): void;
}
//# sourceMappingURL=VideoPlayerEvents.d.ts.map