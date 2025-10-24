"use strict";

export const isVideoPlayerSource = obj => {
  return obj &&
  // obj is not null
  typeof obj === 'object' &&
  // obj is an object
  'name' in obj &&
  // obj has a name property
  obj.name === 'VideoPlayerSource' // obj.name is 'VideoPlayerSource'
  ;
};
//# sourceMappingURL=sourceUtils.js.map