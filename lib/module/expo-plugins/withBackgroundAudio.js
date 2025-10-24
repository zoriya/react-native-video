"use strict";

import { withInfoPlist } from '@expo/config-plugins';

/**
 * Sets `UIBackgroundModes` in `Info.plist` to enable background audio on Apple platforms.
 * This is required for audio to continue playing when the app is in the background.
 */
export const withBackgroundAudio = (c, enableBackgroundAudio) => {
  return withInfoPlist(c, config => {
    const modes = config.modResults.UIBackgroundModes || [];
    if (enableBackgroundAudio) {
      if (!modes.includes('audio')) {
        config.modResults.UIBackgroundModes = [...modes, 'audio'];
      }
    } else {
      config.modResults.UIBackgroundModes = modes.filter(mode => mode !== 'audio');
    }
    return config;
  });
};
//# sourceMappingURL=withBackgroundAudio.js.map