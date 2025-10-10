"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withAndroidPictureInPicture = void 0;
var _configPlugins = require("@expo/config-plugins");
const withAndroidPictureInPicture = (config, enableAndroidPictureInPicture) => {
  return (0, _configPlugins.withAndroidManifest)(config, _config => {
    if (!enableAndroidPictureInPicture) {
      return _config;
    }
    const mainActivity = _configPlugins.AndroidConfig.Manifest.getMainActivity(_config.modResults);
    if (!mainActivity) {
      console.warn('AndroidManifest.xml is missing an <activity android:name=".MainActivity" /> element - skipping adding Picture-In-Picture related config.');
      return _config;
    }
    mainActivity.$['android:supportsPictureInPicture'] = 'true';
    return _config;
  });
};
exports.withAndroidPictureInPicture = withAndroidPictureInPicture;
//# sourceMappingURL=withAndroidPictureInPicture.js.map