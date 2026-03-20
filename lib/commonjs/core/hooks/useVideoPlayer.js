"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVideoPlayer = void 0;
var _react = require("react");
var _sourceUtils = require("../utils/sourceUtils.js");
var _VideoPlayer = require("../VideoPlayer");
var _useManagedInstance = require("./useManagedInstance.js");
const sourceEqual = (a, b) => {
  if ((0, _sourceUtils.isVideoPlayerSource)(a) && (0, _sourceUtils.isVideoPlayerSource)(b)) {
    return a.equals(b);
  }
  return JSON.stringify(a) === JSON.stringify(b);
};

/**
 * Creates a `VideoPlayer` instance and manages its lifecycle.
 *
 * if `initializeOnCreation` is true (default), the `setup` function will be called when the player is started loading source.
 * if `initializeOnCreation` is false, the `setup` function will be called when the player is created. changes made to player made before initializing will be overwritten when initializing.
 *
 * @param source - The source of the video to play
 * @param setup - A function to setup the player
 * @returns The `VideoPlayer` instance
 */
const useVideoPlayer = (source, setup) => {
  const setupCalled = (0, _react.useRef)(false);
  return (0, _useManagedInstance.useManagedInstance)({
    factory: () => {
      const player = new _VideoPlayer.VideoPlayer(source);
      if (setup === undefined) {
        return player;
      }
      if (player.source.config.initializeOnCreation !== false) {
        // if source is small video, it can happen that onLoadStart is called before we set event from JS
        // Thats why we adding event listener and calling setup once if player is loading or ready to play
        // That way we ensure that setup is always called

        const callSetupOnce = () => {
          if (!setupCalled.current) {
            setupCalled.current = true;
            setup?.(player);
          }
        };
        player.addEventListener('onLoadStart', callSetupOnce);
        player.addEventListener('onStatusChange', callSetupOnce);
      } else {
        setup?.(player);
      }
      return player;
    },
    cleanup: player => {
      player.__destroy();
      setupCalled.current = false;
    },
    dependenciesEqualFn: sourceEqual
  }, [JSON.stringify(source)]);
};
exports.useVideoPlayer = useVideoPlayer;
//# sourceMappingURL=useVideoPlayer.js.map