import { type VideoPlayerEvents as NativePlayerEvents, type AllPlayerEvents as PlayerEvents } from "./types/Events";
export declare class VideoPlayerEvents {
    protected eventEmitter: NativePlayerEvents;
    protected eventListeners: Partial<Record<keyof PlayerEvents, Set<(...params: any[]) => void>>>;
    protected readonly supportedEvents: (keyof PlayerEvents)[];
    constructor(eventEmitter: NativePlayerEvents);
    protected triggerEvent<Event extends keyof PlayerEvents>(event: Event, ...params: Parameters<PlayerEvents[Event]>): boolean;
    addEventListener<Event extends keyof PlayerEvents>(event: Event, callback: PlayerEvents[Event]): void;
    removeEventListener<Event extends keyof PlayerEvents>(event: Event, callback: PlayerEvents[Event]): void;
    /**
     * Clears all events from the event emitter.
     */
    clearAllEvents(): void;
    /**
     * Clears a specific event from the event emitter.
     * @param event - The name of the event to clear.
     */
    clearEvent(event: keyof PlayerEvents): void;
}
//# sourceMappingURL=VideoPlayerEvents.d.ts.map