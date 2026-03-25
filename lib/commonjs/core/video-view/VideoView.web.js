"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _react2 = require("@videojs/react");
var _video = require("@videojs/react/video");
require("@videojs/react/video/skin.css");
var _jsxRuntime = require("react/jsx-runtime");
const Player = (0, _react2.createPlayer)({
  features: _react2.videoFeatures
});

/**
 * Attaches the adapter's pre-existing <video> element to the video.js store,
 * then passes the ready store to the adapter.
 */
function PlayerBridge({
  player
}) {
  const {
    store: rawStore,
    container
  } = (0, _react2.usePlayerContext)();
  const store = rawStore;
  const setMedia = (0, _react2.useMediaAttach)();
  (0, _react.useEffect)(() => {
    if (!container) return;
    const video = player.__getMedia();
    setMedia?.(video);
    const detach = store.attach({
      media: video,
      container
    });
    player.__setStore(store);
    return () => {
      player.__setStore(null);
      detach?.();
      setMedia?.(null);
    };
  }, [store, player, setMedia, container]);
  return null;
}

/**
 * Mounts the adapter's <video> element into the DOM via ref callback.
 * The element is created in VideoPlayer constructor so it already has
 * source and event listeners attached.
 */
function VideoElement({
  player,
  objectFit
}) {
  const mountRef = (0, _react.useCallback)(container => {
    if (!container) return;
    const video = player.__getMedia();
    Object.assign(video.style, {
      width: "100%",
      height: "100%",
      objectFit
    });
    if (video.parentNode !== container) {
      container.appendChild(video);
    }
  }, [player, objectFit]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: mountRef,
    style: {
      width: "100%",
      height: "100%"
    }
  });
}
const VideoView = /*#__PURE__*/(0, _react.forwardRef)(({
  player: nPlayer,
  controls = false,
  resizeMode = "none",
  pictureInPicture = false,
  autoEnterPictureInPicture = false,
  keepScreenAwake = true,
  ...props
}, ref) => {
  const player = nPlayer;
  const objectFitMap = {
    contain: "contain",
    cover: "cover",
    stretch: "fill",
    none: "contain"
  };
  const objectFit = objectFitMap[resizeMode] ?? "contain";
  (0, _react.useImperativeHandle)(ref, () => ({
    enterFullscreen: () => {
      document.documentElement.requestFullscreen?.();
    },
    exitFullscreen: () => {
      document.exitFullscreen?.();
    },
    enterPictureInPicture: () => {
      player.__getMedia()?.requestPictureInPicture?.();
    },
    exitPictureInPicture: () => {
      document.exitPictureInPicture?.();
    },
    canEnterPictureInPicture: () => document.pictureInPictureEnabled ?? false,
    addEventListener: (_event, _callback) => {
      return {
        remove: () => {}
      };
    }
  }), [player]);
  const videoContent = /*#__PURE__*/(0, _jsxRuntime.jsx)(VideoElement, {
    player: player,
    objectFit: objectFit
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    ...props,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(Player.Provider, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(PlayerBridge, {
        player: player
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Player.Container, {
        style: {
          position: "absolute",
          inset: "0",
          width: "100%",
          height: "100%"
        },
        children: controls ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_video.VideoSkin, {
          children: videoContent
        }) : videoContent
      })]
    })
  });
});
VideoView.displayName = "VideoView";
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(VideoView);
//# sourceMappingURL=VideoView.web.js.map