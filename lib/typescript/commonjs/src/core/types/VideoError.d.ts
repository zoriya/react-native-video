export type LibraryError = 'library/deallocated' | 'library/application-context-not-found';
export type PlayerError = 'player/released' | 'player/not-initialized' | 'player/asset-not-initialized' | 'player/invalid-source';
export type SourceError = 'source/invalid-uri' | 'source/missing-read-file-permission' | 'source/file-does-not-exist' | 'source/failed-to-initialize-asset' | 'source/unsupported-content-type';
export type VideoViewError = 'view/not-found' | 'view/deallocated' | 'view/picture-in-picture-not-supported';
export type UnknownError = 'unknown/unknown';
export type VideoErrorCode = LibraryError | PlayerError | SourceError | VideoViewError | UnknownError;
export declare class VideoError<TCode extends VideoErrorCode> extends Error {
    private readonly _code;
    private readonly _message;
    private readonly _stack?;
    get code(): TCode;
    get message(): string;
    get stack(): string | undefined;
    toString(): string;
}
export declare class VideoComponentError extends VideoError<VideoViewError> {
}
export declare class VideoRuntimeError extends VideoError<LibraryError | PlayerError | SourceError | UnknownError> {
}
/**
 * Tries to parse an error coming from native to a typed JS video error.
 * @param {VideoError} nativeError The native error instance. This is a JSON in the legacy native module architecture.
 * @returns A {@linkcode VideoRuntimeError} or {@linkcode VideoComponentError}, or the `nativeError` itself if it's not parsable
 * @method
 */
export declare const tryParseNativeVideoError: <T>(nativeError: T) => (VideoRuntimeError | VideoComponentError) | T;
//# sourceMappingURL=VideoError.d.ts.map