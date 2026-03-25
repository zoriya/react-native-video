import type { AllPlayerEvents as PlayerEvents } from "../types/Events";
import type { ListenerSubscription } from "../types/EventEmitter";
import { VideoPlayerEventsBase } from "./VideoPlayerEventsBase";
export declare class VideoPlayerEvents extends VideoPlayerEventsBase {
    addEventListener<Event extends keyof PlayerEvents>(event: Event, callback: PlayerEvents[Event]): ListenerSubscription;
}
//# sourceMappingURL=VideoPlayerEvents.native.d.ts.map