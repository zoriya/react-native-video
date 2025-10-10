"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVideoPlayerSource = void 0;
const isVideoPlayerSource = obj => {
  return obj &&
  // obj is not null
  typeof obj === 'object' &&
  // obj is an object
  'name' in obj &&
  // obj has a name property
  obj.name === 'VideoPlayerSource' // obj.name is 'VideoPlayerSource'
  ;
};
exports.isVideoPlayerSource = isVideoPlayerSource;
//# sourceMappingURL=sourceUtils.js.map