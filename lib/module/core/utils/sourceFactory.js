"use strict";

import { Image, Platform } from 'react-native';
import { NitroModules } from 'react-native-nitro-modules';
import { tryParseNativeVideoError } from "../types/VideoError.js";
import { isVideoPlayerSource } from "./sourceUtils.js";
const VideoPlayerSourceFactory = NitroModules.createHybridObject('VideoPlayerSourceFactory');

/**
 * Creates a `VideoPlayerSource` instance from a URI (string).
 *
 * @param uri - The URI of the video to play
 * @returns The `VideoPlayerSource` instance
 */
export const createSourceFromUri = uri => {
  try {
    return VideoPlayerSourceFactory.fromUri(uri);
  } catch (error) {
    throw tryParseNativeVideoError(error);
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
export const createSourceFromVideoConfig = config => {
  if (config.externalSubtitles) {
    config.externalSubtitles = parseExternalSubtitles(config.externalSubtitles);
  }

  // Ensure platform-based default for DRM type if DRM is provided without a type
  if (config.drm && config.drm.type === undefined) {
    const defaultDrmType = Platform.select({
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
    throw tryParseNativeVideoError(error);
  }
};

/**
 * Parses the external subtitles from the `ExternalSubtitle` to the `NativeExternalSubtitle` format.
 *
 * @param externalSubtitles - The external subtitles to parse
 * @returns The parsed external subtitles
 */
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
export const createSource = source => {
  // If source is a VideoPlayerSource, we can directly return it
  if (isVideoPlayerSource(source)) {
    return source;
  }

  // If source is a string, we can directly create the player
  if (typeof source === 'string') {
    return createSourceFromUri(source);
  }

  // If source is a number (asset), we need to resolve the asset source and create the player
  if (typeof source === 'number') {
    return createSourceFromUri(Image.resolveAssetSource(source).uri);
  }

  // If source is an object (VideoConfig)
  if (typeof source === 'object' && 'uri' in source) {
    if (typeof source.uri === 'string') {
      return createSourceFromVideoConfig(source);
    }
    if (typeof source.uri === 'number') {
      const config = {
        ...source,
        // Resolve the asset source to get the URI
        uri: Image.resolveAssetSource(source.uri).uri
      };
      return createSourceFromVideoConfig(config);
    }
  }
  throw new Error('RNV: Invalid source type');
};
//# sourceMappingURL=sourceFactory.js.map