"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * VideoView is a component that allows you to display a video from a {@link VideoPlayer}.
 *
 * @param player - The player to play the video - {@link VideoPlayer}
 * @param controls - Whether to show the controls. Defaults to false.
 * @param style - The style of the video view - {@link ViewStyle}
 * @param pictureInPicture - Whether to show the picture in picture button. Defaults to false.
 * @param autoEnterPictureInPicture - Whether to automatically enter picture in picture mode
 * when the video is playing. Defaults to false.
 * @param resizeMode - How the video should be resized to fit the view. Defaults to 'none'.
 */
const VideoView = /*#__PURE__*/(0, _react.forwardRef)(({
  player: nPlayer,
  controls = false,
  resizeMode = "none",
  // auto pip is unsupported
  pictureInPicture = false,
  autoEnterPictureInPicture = false,
  keepScreenAwake = true,
  ...props
}, ref) => {
  const player = nPlayer;
  const vRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    const videoElement = player.__getNativeRef();
    vRef.current?.appendChild(videoElement);
    return () => {
      vRef.current?.removeChild(videoElement);
    };
  }, [player]);
  (0, _react.useImperativeHandle)(ref, () => ({
    enterFullscreen: () => {
      player.__getNativeRef().requestFullscreen({
        navigationUI: "hide"
      });
    },
    exitFullscreen: () => {
      document.exitFullscreen();
    },
    enterPictureInPicture: () => {
      player.__getNativeRef().requestPictureInPicture();
    },
    exitPictureInPicture: () => {
      document.exitPictureInPicture();
    },
    canEnterPictureInPicture: () => document.pictureInPictureEnabled
  }), [player]);
  (0, _react.useEffect)(() => {
    player.__getNativeRef().controls = controls;
  }, [player, controls]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    ...props,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: vRef,
      style: {
        objectFit: resizeMode === "stretch" ? "fill" : resizeMode
      }
    })
  });
});
VideoView.displayName = "VideoView";
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(VideoView);
//# sourceMappingURL=VideoView.web.js.map