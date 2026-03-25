"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPlayerEvents = void 0;
var _VideoPlayerEventsBase = require("./VideoPlayerEventsBase.js");
class VideoPlayerEvents extends _VideoPlayerEventsBase.VideoPlayerEventsBase {
  addEventListener(event, callback) {
    switch (event) {
      // Web-only events will be added here
      default:
        return super.addEventListener(event, callback);
    }
  }
}
exports.VideoPlayerEvents = VideoPlayerEvents;
//# sourceMappingURL=VideoPlayerEvents.web.js.map