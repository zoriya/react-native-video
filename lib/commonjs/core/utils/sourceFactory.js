"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSourceFromVideoConfig = exports.createSourceFromUri = exports.createSource = void 0;
var _reactNative = require("react-native");
var _reactNativeNitroModules = require("react-native-nitro-modules");
var _VideoError = require("../types/VideoError.js");
var _sourceUtils = require("./sourceUtils.js");
const VideoPlayerSourceFactory = _reactNativeNitroModules.NitroModules.createHybridObject('VideoPlayerSourceFactory');

/**
 * Creates a `VideoPlayerSource` instance from a URI (string).
 *
 * @param uri - The URI of the video to play
 * @returns The `VideoPlayerSource` instance
 */
const createSourceFromUri = uri => {
  if (!uri || typeof uri !== 'string') {
    throw new Error('RNV: Invalid source. The URI must be a non-empty string.');
  }
  try {
    return VideoPlayerSourceFactory.fromUri(uri);
  } catch (error) {
    throw (0, _VideoError.tryParseNativeVideoError)(error);
  }
};

/**
 * Creates a `VideoPlayerSource` instance from a `VideoConfig`.
 *
 * @note The `uri` property is required to be a string.
 *
 * @param config - The `VideoConfig` to create the `VideoPlayerSource` from
 * @returns The `VideoPlayerSource` instance
 */
exports.createSourceFromUri = createSourceFromUri;
const createSourceFromVideoConfig = config => {
  if (!config.uri || typeof config.uri !== 'string') {
    throw new _VideoError.VideoRuntimeError('source/invalid-uri', 'Invalid source URI');
  }
  if (config.externalSubtitles) {
    config.externalSubtitles = parseExternalSubtitles(config.externalSubtitles);
  }

  // Ensure platform-based default for DRM type if DRM is provided without a type
  if (config.drm && config.drm.type === undefined) {
    const defaultDrmType = _reactNative.Platform.select({
      android: 'widevine',
      ios: 'fairplay',
      default: undefined
    });
    if (defaultDrmType) {
      config.drm = {
        ...config.drm,
        type: defaultDrmType
      };
    }
  }

  // Set default value for initializeOnCreation (true)
  if (config.initializeOnCreation === undefined) {
    config.initializeOnCreation = true;
  }
  try {
    return VideoPlayerSourceFactory.fromVideoConfig(config);
  } catch (error) {
    throw (0, _VideoError.tryParseNativeVideoError)(error);
  }
};

/**
 * Parses the external subtitles from the `ExternalSubtitle` to the `NativeExternalSubtitle` format.
 *
 * @param externalSubtitles - The external subtitles to parse
 * @returns The parsed external subtitles
 */
exports.createSourceFromVideoConfig = createSourceFromVideoConfig;
const parseExternalSubtitles = externalSubtitles => {
  return externalSubtitles.map(subtitle => ({
    uri: subtitle.uri,
    label: subtitle.label,
    type: subtitle.type ?? 'auto',
    language: subtitle.language ?? 'und'
  }));
};

/**
 * Creates a `VideoPlayerSource`
 *
 * @param source - The `VideoSource` to create the `VideoPlayerSource` from
 * @returns The `VideoPlayerSource` instance
 */
const createSource = source => {
  // If source is a VideoPlayerSource, we can directly return it
  if ((0, _sourceUtils.isVideoPlayerSource)(source)) {
    return source;
  }

  // If source is a string, we can directly create the player
  if (typeof source === 'string') {
    return createSourceFromUri(source);
  }

  // If source is a number (asset), we need to resolve the asset source and create the player
  if (typeof source === 'number') {
    const resolvedSource = _reactNative.Image.resolveAssetSource(source);
    if (!resolvedSource?.uri || typeof resolvedSource.uri !== 'string') {
      throw new _VideoError.VideoRuntimeError('source/invalid-uri', 'Invalid source URI');
    }
    return createSourceFromUri(resolvedSource.uri);
  }

  // If source is an object (VideoConfig)
  if (typeof source === 'object' && source !== null && 'uri' in source) {
    if (typeof source.uri === 'string') {
      return createSourceFromVideoConfig(source);
    }
    if (typeof source.uri === 'number') {
      const resolvedSource = _reactNative.Image.resolveAssetSource(source.uri);
      if (!resolvedSource?.uri || typeof resolvedSource.uri !== 'string') {
        throw new _VideoError.VideoRuntimeError('source/invalid-uri', 'Invalid source URI');
      }
      const config = {
        ...source,
        uri: resolvedSource.uri
      };
      return createSourceFromVideoConfig(config);
    }
    throw new _VideoError.VideoRuntimeError('source/invalid-uri', 'Invalid source URI');
  }
  throw new _VideoError.VideoRuntimeError('player/invalid-source', 'Invalid source');
};
exports.createSource = createSource;
//# sourceMappingURL=sourceFactory.js.map