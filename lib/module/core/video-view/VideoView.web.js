"use strict";

import { forwardRef, memo, useCallback, useEffect, useImperativeHandle } from "react";
import { View } from "react-native";
import { createPlayer, videoFeatures, usePlayerContext, useMediaAttach } from "@videojs/react";
import { VideoSkin } from "@videojs/react/video";
import "@videojs/react/video/skin.css";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Player = createPlayer({
  features: videoFeatures
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
  } = usePlayerContext();
  const store = rawStore;
  const setMedia = useMediaAttach();
  useEffect(() => {
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
  const mountRef = useCallback(container => {
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
  return /*#__PURE__*/_jsx("div", {
    ref: mountRef,
    style: {
      width: "100%",
      height: "100%"
    }
  });
}
const VideoView = /*#__PURE__*/forwardRef(({
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
  useImperativeHandle(ref, () => ({
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
  const videoContent = /*#__PURE__*/_jsx(VideoElement, {
    player: player,
    objectFit: objectFit
  });
  return /*#__PURE__*/_jsx(View, {
    ...props,
    children: /*#__PURE__*/_jsxs(Player.Provider, {
      children: [/*#__PURE__*/_jsx(PlayerBridge, {
        player: player
      }), /*#__PURE__*/_jsx(Player.Container, {
        style: {
          position: "absolute",
          inset: "0",
          width: "100%",
          height: "100%"
        },
        children: controls ? /*#__PURE__*/_jsx(VideoSkin, {
          children: videoContent
        }) : videoContent
      })]
    })
  });
});
VideoView.displayName = "VideoView";
export default /*#__PURE__*/memo(VideoView);
//# sourceMappingURL=VideoView.web.js.map