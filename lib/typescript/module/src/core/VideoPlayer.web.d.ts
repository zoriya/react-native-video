import videojs from "video.js";
import type { VideoPlayerSource } from "../spec/nitro/VideoPlayerSource.nitro";
import type { AudioTrack } from "./types/AudioTrack";
import type { IgnoreSilentSwitchMode } from "./types/IgnoreSilentSwitchMode";
import type { MixAudioMode } from "./types/MixAudioMode";
import type { TextTrack } from "./types/TextTrack";
import type { NoAutocomplete } from "./types/Utils";
import type { VideoConfig, VideoSource } from "./types/VideoConfig";
import type { VideoPlayerBase } from "./types/VideoPlayerBase";
import type { VideoPlayerSourceBase } from "./types/VideoPlayerSourceBase";
import type { VideoPlayerStatus } from "./types/VideoPlayerStatus";
import { VideoPlayerEvents } from "./VideoPlayerEvents";
import type { VideoTrack } from "./types/VideoTrack";
import type { QualityLevel } from "./types/QualityLevel";
type VideoJsPlayer = ReturnType<typeof videojs>;
export type VideoJsTextTracks = {
    length: number;
    [i: number]: {
        id: string;
        label: string;
        language: string;
        default: boolean;
        mode: "showing" | "disabled" | "hidden";
    };
};
export type VideoJsTracks = {
    length: number;
    [i: number]: {
        id: string;
        label: string;
        language: string;
        enabled: boolean;
    };
};
export type VideoJsQualityArray = {
    length: number;
    selectedIndex: number;
    [i: number]: {
        id: string;
        label: string;
        width: number;
        height: number;
        bitrate: number;
        frameRate: number;
        enabled: boolean;
    };
};
declare class VideoPlayer extends VideoPlayerEvents implements VideoPlayerBase {
    protected video: HTMLVideoElement;
    player: VideoJsPlayer;
    private mediaSession;
    private _source;
    constructor(source: VideoSource | VideoConfig | VideoPlayerSource);
    __getNativeRef(): HTMLVideoElement;
    get source(): VideoPlayerSourceBase;
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
    selectAudioTrack(track: AudioTrack | null): void;
    get selectedAudioTrack(): AudioTrack | undefined;
    getAvailableVideoTracks(): VideoTrack[];
    selectVideoTrack(track: VideoTrack | null): void;
    get selectedVideoTrack(): VideoTrack | undefined;
    getAvailableQualities(): QualityLevel[];
    selectQuality(quality: QualityLevel | null): void;
    get currentQuality(): QualityLevel | undefined;
    get autoQualityEnabled(): boolean;
}
export { VideoPlayer };
//# sourceMappingURL=VideoPlayer.web.d.ts.map