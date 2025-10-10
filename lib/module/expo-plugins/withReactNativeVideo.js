"use strict";

import { createRunOncePlugin } from '@expo/config-plugins';
import { getPackageInfo } from "./getPackageInfo.js";
import { withAndroidExtensions } from "./withAndroidExtensions.js";
import { withAndroidPictureInPicture } from "./withAndroidPictureInPicture.js";
import { withBackgroundAudio } from "./withBackgroundAudio.js";
const withRNVideo = (config, props = {}) => {
  if (props.enableAndroidPictureInPicture) {
    config = withAndroidPictureInPicture(config, props.enableAndroidPictureInPicture);
  }
  if (props.androidExtensions != null) {
    config = withAndroidExtensions(config, props.androidExtensions);
  }
  if (props.enableBackgroundAudio) {
    config = withBackgroundAudio(config, props.enableBackgroundAudio);
  }
  return config;
};
const {
  name,
  version
} = getPackageInfo();
export default createRunOncePlugin(withRNVideo, name, version);
//# sourceMappingURL=withReactNativeVideo.js.map