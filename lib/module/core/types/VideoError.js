"use strict";

export class VideoError extends Error {
  get code() {
    return this._code;
  }
  get message() {
    return this._message;
  }
  get stack() {
    return this._stack;
  }

  /**
   * @internal
   */
  constructor(code, message, stack) {
    super(`[${code}]: ${message}`);
    super.name = `[ReactNativeVideo] ${code}`;
    super.message = message;
    super.stack = stack;
    this._code = code;
    this._message = message;
    this._stack = stack;
  }
  toString() {
    let string = `[${this.code}]: ${this.message}`;
    return string;
  }
}
export class VideoComponentError extends VideoError {}
export class VideoRuntimeError extends VideoError {}

/**
 * Check if the message contains code and message
 */
const getCodeAndMessage = message => {
  // (...){%@(match[1])::(match[2]);@%}(...)
  const regex = /\{%@([^:]+)::([^@]+)@%\}/;
  const match = message.match(regex);
  if (match && match.length === 3 && typeof match[1] === 'string' && typeof match[2] === 'string') {
    return {
      code: match[1],
      message: match[2]
    };
  }
  return null;
};

/**
 * Check if the error has a stack property
 * If it does, it will try to parse the error message in the stack trace
 * and replace it with the proper code and message
 */
const maybeFixErrorStack = error => {
  if ('stack' in error && typeof error.stack === 'string') {
    const stack = error.stack;

    // (...){%@(match[1])::(match[2]);@%}(...)
    const regex = /\{%@([^:]+)::([^@]+)@%\}/;
    const match = stack.match(regex);
    if (match && match.length === 3 && typeof match[1] === 'string' && typeof match[2] === 'string') {
      error.stack = error.stack.replace(regex, `[${match[1]}]: ${match[2]}`);
    }
  }
};
const isVideoError = error => typeof error === 'object' && error != null &&
// @ts-expect-error error is still unknown
typeof error.message === 'string' &&
// @ts-expect-error error is still unknown
getCodeAndMessage(error.message) != null;
const hasStack = error => typeof error === 'object' && error != null && 'stack' in error && typeof error.stack === 'string';

/**
 * Tries to parse an error coming from native to a typed JS video error.
 * @param {VideoError} nativeError The native error instance. This is a JSON in the legacy native module architecture.
 * @returns A {@linkcode VideoRuntimeError} or {@linkcode VideoComponentError}, or the `nativeError` itself if it's not parsable
 * @method
 */
export const tryParseNativeVideoError = nativeError => {
  if (isVideoError(nativeError)) {
    const result = getCodeAndMessage(nativeError.message);
    if (result == null) {
      return nativeError;
    }
    const {
      code,
      message
    } = result;
    maybeFixErrorStack(nativeError);
    if (code.startsWith('view')) {
      return new VideoComponentError(code, message, hasStack(nativeError) ? nativeError.stack : undefined);
    }
    return new VideoRuntimeError(
    // @ts-expect-error the code is string, we narrow it down to TS union.
    code, message, hasStack(nativeError) ? nativeError.stack : undefined);
  }
  return nativeError;
};
//# sourceMappingURL=VideoError.js.map