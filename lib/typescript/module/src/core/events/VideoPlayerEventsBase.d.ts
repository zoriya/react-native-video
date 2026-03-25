import { type JSVideoPlayerEvents, type AllPlayerEvents as PlayerEvents } from "../types/Events";
import type { ListenerSubscription, VideoPlayerEventEmitterBase } from "../types/EventEmitter";
export declare class VideoPlayerEventsBase {
    protected eventEmitter: VideoPlayerEventEmitterBase;
    protected jsEventListeners: Partial<Record<keyof PlayerEvents, Set<(...params: any[]) => void>>>;
    protected readonly supportedEvents: (keyof PlayerEvents)[];
    constructor(eventEmitter: VideoPlayerEventEmitterBase);
    protected triggerJSEvent<Event extends keyof JSVideoPlayerEvents>(event: Event, ...params: Parameters<JSVideoPlayerEvents[Event]>): boolean;
    addEventListener<Event extends keyof PlayerEvents>(event: Event, callback: PlayerEvents[Event]): ListenerSubscription;
    clearAllEvents(): void;
}
//# sourceMappingURL=VideoPlayerEventsBase.d.ts.map