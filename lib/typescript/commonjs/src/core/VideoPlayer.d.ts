import type { VideoPlayer as VideoPlayerImpl } from "../spec/nitro/VideoPlayer.nitro";
import type { VideoPlayerSource } from "../spec/nitro/VideoPlayerSource.nitro";
import type { IgnoreSilentSwitchMode } from "./types/IgnoreSilentSwitchMode";
import type { MixAudioMode } from "./types/MixAudioMode";
import type { TextTrack } from "./types/TextTrack";
import type { NoAutocomplete } from "./types/Utils";
import type { VideoConfig, VideoSource } from "./types/VideoConfig";
import type { VideoPlayerBase } from "./types/VideoPlayerBase";
import type { VideoPlayerStatus } from "./types/VideoPlayerStatus";
import { VideoPlayerEvents } from "./VideoPlayerEvents";
import type { AudioTrack } from "./types/AudioTrack";
import type { VideoTrack } from "./types/VideoTrack";
import type { QualityLevel } from "./types/QualityLevel";
declare class VideoPlayer extends VideoPlayerEvents implements VideoPlayerBase {
    private _player;
    private _releaseTimeout;
    protected get player(): VideoPlayerImpl;
    constructor(source: VideoSource | VideoConfig | VideoPlayerSource);
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
    set mixAudioMode(value: MixAudioMode);
    get ignoreSilentSwitchMode(): IgnoreSilentSwitchMode;
    set ignoreSilentSwitchMode(value: IgnoreSilentSwitchMode);
    get playInBackground(): boolean;
    set playInBackground(value: boolean);
    get playWhenInactive(): boolean;
    set playWhenInactive(value: boolean);
    get isPlaying(): boolean;
    get showNotificationControls(): boolean;
    set showNotificationControls(value: boolean);
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
    getAvailableAudioTracks(): AudioTrack[];
    selectAudioTrack(_: AudioTrack | null): void;
    get selectedAudioTrack(): AudioTrack | undefined;
    getAvailableVideoTracks(): VideoTrack[];
    selectVideoTrack(_: VideoTrack | null): void;
    get selectedVideoTrack(): VideoTrack | undefined;
    getAvailableQualities(): QualityLevel[];
    selectQuality(_: QualityLevel | null): void;
    get currentQuality(): QualityLevel | undefined;
    get autoQualityEnabled(): boolean;
}
export { VideoPlayer };
//# sourceMappingURL=VideoPlayer.d.ts.map