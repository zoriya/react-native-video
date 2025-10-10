"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeToPodfile = void 0;
var _generateCode = require("@expo/config-plugins/build/utils/generateCode");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const writeToPodfile = (projectRoot, key, value, testApp = false) => {
  const podfilePath = _path.default.join(projectRoot, 'ios', 'Podfile');
  const podfileContent = _fs.default.readFileSync(podfilePath, 'utf8');
  if (podfileContent.includes(`$${key} =`)) {
    console.warn(`RNV - Podfile already contains a definition for "$${key}". Skipping...`);
    return;
  }
  if (testApp) {
    mergeTestAppPodfile(podfileContent, podfilePath, key, value);
  } else {
    mergeExpoPodfile(podfileContent, podfilePath, key, value);
  }
};
exports.writeToPodfile = writeToPodfile;
const mergeTestAppPodfile = (podfileContent, podfilePath, key, value) => {
  // We will try to inject the variable definition above the `use_test_app!` call in the Podfile.
  const newPodfileContent = (0, _generateCode.mergeContents)({
    tag: `rn-video-set-${key.toLowerCase()}`,
    src: podfileContent,
    newSrc: `$${key} = ${value}`,
    anchor: /use_test_app!/,
    offset: -1,
    // Insert the key-value pair just above the `use_test_app!` call.
    comment: '#'
  });

  // Write to Podfile only if the merge was successful
  if (newPodfileContent.didMerge) {
    _fs.default.writeFileSync(podfilePath, newPodfileContent.contents);
  } else {
    console.warn(`RNV - Failed to write "$${key} = ${value}" to Test App Podfile`);
  }
};
const mergeExpoPodfile = (podfileContent, podfilePath, key, value) => {
  const newPodfileContent = (0, _generateCode.mergeContents)({
    tag: `rn-video-set-${key.toLowerCase()}`,
    src: podfileContent,
    newSrc: `$${key} = ${value}`,
    anchor: /platform :ios/,
    offset: 0,
    comment: '#'
  });
  if (newPodfileContent.didMerge) {
    _fs.default.writeFileSync(podfilePath, newPodfileContent.contents);
  } else {
    console.warn(`RNV - Failed to write "$${key} = ${value}" to Podfile`);
  }
};
//# sourceMappingURL=writeToPodfile.js.map