"use strict";

import * as React from 'react';
import { NitroModules } from 'react-native-nitro-modules';
import { tryParseNativeVideoError, VideoComponentError, VideoError } from "../types/VideoError.js";
import { NativeVideoView } from "./NativeVideoView.js";
import { jsx as _jsx } from "react/jsx-runtime";
let nitroIdCounter = 1;
const VideoViewViewManagerFactory = NitroModules.createHybridObject('VideoViewViewManagerFactory');
const wrapNativeViewManagerFunction = (manager, func) => {
  try {
    if (manager === null) {
      throw new VideoError('view/not-found', 'View manager not found');
    }
    return func(manager);
  } catch (error) {
    throw tryParseNativeVideoError(error);
  }
};
const updateProps = (manager, props) => {
  manager.player = props.player.__getNativePlayer();
  manager.controls = props.controls ?? false;
  manager.pictureInPicture = props.pictureInPicture ?? false;
  manager.autoEnterPictureInPicture = props.autoEnterPictureInPicture ?? false;
  manager.resizeMode = props.resizeMode ?? 'none';
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
  onPictureInPictureChange,
  onFullscreenChange,
  willEnterFullscreen,
  willExitFullscreen,
  willEnterPictureInPicture,
  willExitPictureInPicture,
  ...props
}, ref) => {
  const nitroId = React.useMemo(() => nitroIdCounter++, []);
  const nitroViewManager = React.useRef(null);
  const [isManagerReady, setIsManagerReady] = React.useState(false);
  const setupViewManager = React.useCallback(id => {
    try {
      if (nitroViewManager.current === null) {
        nitroViewManager.current = VideoViewViewManagerFactory.createViewManager(id);

        // Should never happen
        if (!nitroViewManager.current) {
          throw new VideoError('view/not-found', 'Failed to create View Manager');
        }
      }
      setIsManagerReady(true);
    } catch (error) {
      const parsedError = tryParseNativeVideoError(error);
      if (parsedError instanceof VideoComponentError && parsedError.code === 'view/not-found') {
        // The view was not found, did view get unmounted?
        if (id === nitroId) {
          // The id from native is same as the one we have,
          // so the view was unmounted before native manager was able to find it

          // On slow devices, when we quickly mount and unmount the view,
          // the native manager may not have been able to find the view before the view was unmounted
          // This should really never happen, but it's better to be safe than sorry

          // We don't throw an error here, because it's not an actual error.
          console.warn('[ReactNativeVideo] VideoView was unmounted before native manager was able to find it. It can happen when the view is quickly mounted and unmounted.');
          return;
        }
      }
      throw parsedError;
    }
  }, [nitroId]);
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
    },
    addEventListener: (event, callback) => {
      return wrapNativeViewManagerFunction(nitroViewManager.current, manager => {
        switch (event) {
          case 'onPictureInPictureChange':
            return manager.addOnPictureInPictureChangeListener(callback);
          case 'onFullscreenChange':
            return manager.addOnFullscreenChangeListener(callback);
          case 'willEnterFullscreen':
            return manager.addWillEnterFullscreenListener(callback);
          case 'willExitFullscreen':
            return manager.addWillExitFullscreenListener(callback);
          case 'willEnterPictureInPicture':
            return manager.addWillEnterPictureInPictureListener(callback);
          case 'willExitPictureInPicture':
            return manager.addWillExitPictureInPictureListener(callback);
          default:
            throw new Error(`[React Native Video] Unsupported event: ${event}`);
        }
      });
    }
  }), []);

  // Cleanup all listeners on unmount
  React.useEffect(() => {
    return () => {
      if (nitroViewManager.current) {
        nitroViewManager.current.clearAllListeners();
        setIsManagerReady(false);
      }
    };
  }, []);

  // Register prop-based event callbacks as listeners
  React.useEffect(() => {
    if (!nitroViewManager.current) {
      return;
    }
    const subscriptions = [];
    if (onPictureInPictureChange) {
      subscriptions.push(nitroViewManager.current.addOnPictureInPictureChangeListener(onPictureInPictureChange));
    }
    if (onFullscreenChange) {
      subscriptions.push(nitroViewManager.current.addOnFullscreenChangeListener(onFullscreenChange));
    }
    if (willEnterFullscreen) {
      subscriptions.push(nitroViewManager.current.addWillEnterFullscreenListener(willEnterFullscreen));
    }
    if (willExitFullscreen) {
      subscriptions.push(nitroViewManager.current.addWillExitFullscreenListener(willExitFullscreen));
    }
    if (willEnterPictureInPicture) {
      subscriptions.push(nitroViewManager.current.addWillEnterPictureInPictureListener(willEnterPictureInPicture));
    }
    if (willExitPictureInPicture) {
      subscriptions.push(nitroViewManager.current.addWillExitPictureInPictureListener(willExitPictureInPicture));
    }
    return () => {
      subscriptions.forEach(sub => sub.remove());
    };
  }, [onPictureInPictureChange, onFullscreenChange, willEnterFullscreen, willExitFullscreen, willEnterPictureInPicture, willExitPictureInPicture, isManagerReady]);

  // Update non-event props
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
  }, [player, controls, pictureInPicture, autoEnterPictureInPicture, resizeMode, props, isManagerReady]);
  return /*#__PURE__*/_jsx(NativeVideoView, {
    nitroId: nitroId,
    onNitroIdChange: onNitroIdChange,
    ...props
  });
});
VideoView.displayName = 'VideoView';
export default /*#__PURE__*/React.memo(VideoView);
//# sourceMappingURL=VideoView.js.map