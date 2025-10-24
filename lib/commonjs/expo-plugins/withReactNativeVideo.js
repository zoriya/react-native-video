"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _configPlugins = require("@expo/config-plugins");
var _getPackageInfo = require("./getPackageInfo.js");
var _withAndroidExtensions = require("./withAndroidExtensions.js");
var _withAndroidPictureInPicture = require("./withAndroidPictureInPicture.js");
var _withBackgroundAudio = require("./withBackgroundAudio.js");
const withRNVideo = (config, props = {}) => {
  if (props.enableAndroidPictureInPicture) {
    config = (0, _withAndroidPictureInPicture.withAndroidPictureInPicture)(config, props.enableAndroidPictureInPicture);
  }
  if (props.androidExtensions != null) {
    config = (0, _withAndroidExtensions.withAndroidExtensions)(config, props.androidExtensions);
  }
  if (props.enableBackgroundAudio) {
    config = (0, _withBackgroundAudio.withBackgroundAudio)(config, props.enableBackgroundAudio);
  }
  return config;
};
const {
  name,
  version
} = (0, _getPackageInfo.getPackageInfo)();
var _default = exports.default = (0, _configPlugins.createRunOncePlugin)(withRNVideo, name, version);
//# sourceMappingURL=withReactNativeVideo.js.map