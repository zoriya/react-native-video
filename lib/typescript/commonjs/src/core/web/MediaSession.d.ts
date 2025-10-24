import type videojs from "video.js";
import type { CustomVideoMetadata } from "../types/VideoConfig";
type VideoJsPlayer = ReturnType<typeof videojs>;
export declare class MediaSessionHandler {
    private player;
    enabled: boolean;
    constructor(player: VideoJsPlayer);
    enable(): void;
    disable(): void;
    updateMediaSession(metadata: CustomVideoMetadata | undefined): void;
}
export {};
//# sourceMappingURL=MediaSession.d.ts.map