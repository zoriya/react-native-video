"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNativeNitroModules = require("react-native-nitro-modules");
var _VideoError = require("../types/VideoError.js");
var _NativeVideoView = require("./NativeVideoView.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
let nitroIdCounter = 1;
const VideoViewViewManagerFactory = _reactNativeNitroModules.NitroModules.createHybridObject('VideoViewViewManagerFactory');
const wrapNativeViewManagerFunction = (manager, func) => {
  try {
    if (manager === null) {
      throw new _VideoError.VideoError('view/not-found', 'View manager not found');
    }
    return func(manager);
  } catch (error) {
    throw (0, _VideoError.tryParseNativeVideoError)(error);
  }
};
const updateProps = (manager, props) => {
  manager.player = props.player.__getNativePlayer();
  manager.controls = props.controls ?? false;
  manager.pictureInPicture = props.pictureInPicture ?? false;
  manager.autoEnterPictureInPicture = props.autoEnterPictureInPicture ?? false;
  manager.resizeMode = props.resizeMode ?? 'none';
  manager.onPictureInPictureChange = props.onPictureInPictureChange;
  manager.onFullscreenChange = props.onFullscreenChange;
  manager.willEnterFullscreen = props.willEnterFullscreen;
  manager.willExitFullscreen = props.willExitFullscreen;
  manager.willEnterPictureInPicture = props.willEnterPictureInPicture;
  manager.willExitPictureInPicture = props.willExitPictureInPicture;
  manager.keepScreenAwake = props.keepScreenAwake ?? true;
  manager.surfaceType = props.surfaceType ?? 'surface';
};

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
const VideoView = /*#__PURE__*/React.forwardRef(({
  player,
  controls = false,
  pictureInPicture = false,
  autoEnterPictureInPicture = false,
  resizeMode = 'none',
  ...props
}, ref) => {
  const nitroId = React.useMemo(() => nitroIdCounter++, []);
  const nitroViewManager = React.useRef(null);
  const setupViewManager = React.useCallback(id => {
    try {
      if (nitroViewManager.current === null) {
        nitroViewManager.current = VideoViewViewManagerFactory.createViewManager(id);

        // Should never happen
        if (!nitroViewManager.current) {
          throw new _VideoError.VideoError('view/not-found', 'Failed to create View Manager');
        }
      }

      // Updates props to native view
      updateProps(nitroViewManager.current, {
        ...props,
        player: player,
        controls: controls,
        pictureInPicture: pictureInPicture,
        autoEnterPictureInPicture: autoEnterPictureInPicture,
        resizeMode: resizeMode
      });
    } catch (error) {
      throw (0, _VideoError.tryParseNativeVideoError)(error);
    }
  }, [props, player, controls, pictureInPicture, autoEnterPictureInPicture, resizeMode]);
  const onNitroIdChange = React.useCallback(event => {
    setupViewManager(event.nativeEvent.nitroId);
  }, [setupViewManager]);
  React.useImperativeHandle(ref, () => ({
    enterFullscreen: () => {
      wrapNativeViewManagerFunction(nitroViewManager.current, manager => {
        manager.enterFullscreen();
      });
    },
    exitFullscreen: () => {
      wrapNativeViewManagerFunction(nitroViewManager.current, manager => {
        manager.exitFullscreen();
      });
    },
    enterPictureInPicture: () => {
      wrapNativeViewManagerFunction(nitroViewManager.current, manager => {
        manager.enterPictureInPicture();
      });
    },
    exitPictureInPicture: () => {
      wrapNativeViewManagerFunction(nitroViewManager.current, manager => {
        manager.exitPictureInPicture();
      });
    },
    canEnterPictureInPicture: () => {
      return wrapNativeViewManagerFunction(nitroViewManager.current, manager => {
        return manager.canEnterPictureInPicture();
      });
    }
  }), []);
  React.useEffect(() => {
    if (!nitroViewManager.current) {
      return;
    }

    // Updates props to native view
    updateProps(nitroViewManager.current, {
      ...props,
      player: player,
      controls: controls,
      pictureInPicture: pictureInPicture,
      autoEnterPictureInPicture: autoEnterPictureInPicture,
      resizeMode: resizeMode
    });
  }, [player, controls, pictureInPicture, autoEnterPictureInPicture, resizeMode, props]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NativeVideoView.NativeVideoView, {
    nitroId: nitroId,
    onNitroIdChange: onNitroIdChange,
    ...props
  });
});
VideoView.displayName = 'VideoView';
var _default = exports.default = /*#__PURE__*/React.memo(VideoView);
//# sourceMappingURL=VideoView.js.map