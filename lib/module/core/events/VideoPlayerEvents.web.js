"use strict";

import { VideoPlayerEventsBase } from "./VideoPlayerEventsBase.js";
export class VideoPlayerEvents extends VideoPlayerEventsBase {
  addEventListener(event, callback) {
    switch (event) {
      // Web-only events will be added here
      default:
        return super.addEventListener(event, callback);
    }
  }
}
//# sourceMappingURL=VideoPlayerEvents.web.js.map