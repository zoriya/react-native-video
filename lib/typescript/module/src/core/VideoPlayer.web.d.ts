import shaka from "shaka-player";
import type { VideoPlayerSource } from "../spec/nitro/VideoPlayerSource.nitro";
import type { IgnoreSilentSwitchMode } from "./types/IgnoreSilentSwitchMode";
import type { MixAudioMode } from "./types/MixAudioMode";
import type { TextTrack } from "./types/TextTrack";
import type { NoAutocomplete } from "./types/Utils";
import type { VideoConfig, VideoSource } from "./types/VideoConfig";
import type { VideoPlayerBase } from "./types/VideoPlayerBase";
import type { VideoPlayerStatus } from "./types/VideoPlayerStatus";
import { VideoPlayerEvents } from "./VideoPlayerEvents";
declare class VideoPlayer extends VideoPlayerEvents implements VideoPlayerBase {
    protected player: shaka.Player;
    protected video: HTMLVideoElement;
    protected headers: Record<string, string>;
    constructor(source: VideoSource | VideoConfig | VideoPlayerSource);
    __getNativeRef(): HTMLVideoElement;
    get source(): VideoPlayerSource;
    get status(): VideoPlayerStatus;
    get duration(): number;
    get volume(): number;
    set volume(value: number);
    get currentTime(): number;
    set currentTime(value: number);
    get muted(): boolean;
    set muted(value: boolean);
    get loop(): boolean;
    set loop(value: boolean);
    get rate(): number;
    set rate(value: number);
    get mixAudioMode(): MixAudioMode;
    set mixAudioMode(_: MixAudioMode);
    get ignoreSilentSwitchMode(): IgnoreSilentSwitchMode;
    set ignoreSilentSwitchMode(_: IgnoreSilentSwitchMode);
    get playInBackground(): boolean;
    set playInBackground(_: boolean);
    get playWhenInactive(): boolean;
    set playWhenInactive(_: boolean);
    get isPlaying(): boolean;
    initialize(): Promise<void>;
    preload(): Promise<void>;
    /**
     * Releases the player's native resources and releases native state.
     * After calling this method, the player is no longer usable.
     * Accessing any properties or methods of the player after calling this method will throw an error.
     * If you want to clean player resource use `replaceSourceAsync` with `null` instead.
     */
    release(): void;
    play(): void;
    pause(): void;
    seekBy(time: number): void;
    seekTo(time: number): void;
    replaceSourceAsync(source: VideoSource | VideoConfig | NoAutocomplete<VideoPlayerSource> | null): Promise<void>;
    getAvailableTextTracks(): TextTrack[];
    selectTextTrack(textTrack: TextTrack | null): void;
    get selectedTrack(): TextTrack | undefined;
}
export { VideoPlayer };
//# sourceMappingURL=VideoPlayer.web.d.ts.map