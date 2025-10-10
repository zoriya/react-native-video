"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPackageInfo = getPackageInfo;
function getPackageInfo() {
  // src/expo-plugins/getPackageInfo.ts
  try {
    const packageJson = require('../../package.json');
    return {
      name: packageJson.name,
      version: packageJson.version
    };
  } catch (_) {}

  // lib/commonjs/expo-plugins/getPackageInfo.js
  try {
    const packageJson = require('../../../package.json');
    return {
      name: packageJson.name,
      version: packageJson.version
    };
  } catch (_) {}
  throw new Error('Failed to get (react-native-video) package info');
}
//# sourceMappingURL=getPackageInfo.js.map