"use strict";

import { AndroidConfig, withAndroidManifest } from '@expo/config-plugins';
export const withAndroidNotificationControls = oldConfig => {
  return withAndroidManifest(oldConfig, config => {
    const mainApplication = AndroidConfig.Manifest.getMainApplication(config.modResults);
    if (!mainApplication) {
      console.warn('AndroidManifest.xml is missing an <activity android:name=".MainActivity" /> element - skipping adding Notification Controls related config.');
      return config;
    }
    mainApplication.service?.push({
      '$': {
        'android:name': 'com.twg.video.core.services.playback.VideoPlaybackService',
        'android:exported': 'false',
        'android:foregroundServiceType': 'mediaPlayback'
      },
      'intent-filter': [{
        action: [{
          $: {
            'android:name': 'androidx.media3.session.MediaSessionService'
          }
        }]
      }]
    });
    config.android?.permissions?.push('android.permission.FOREGROUND_SERVICE', 'android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK');
    return config;
  });
};
//# sourceMappingURL=withAndroidNotificationControls.js.map