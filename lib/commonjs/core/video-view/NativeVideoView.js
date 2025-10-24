"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NativeVideoView = void 0;
var _reactNative = require("react-native");
var _VideoViewNativeComponent = _interopRequireDefault(require("../../spec/fabric/VideoViewNativeComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LINKING_ERROR = `The package 'react-native-video' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const ComponentName = 'VideoView';
const NativeVideoView = exports.NativeVideoView = _reactNative.UIManager.hasViewManagerConfig(ComponentName) != null ? _VideoViewNativeComponent.default : () => {
  throw new Error(LINKING_ERROR);
};
//# sourceMappingURL=NativeVideoView.js.map