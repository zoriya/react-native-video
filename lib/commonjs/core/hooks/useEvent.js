"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEvent = void 0;
var _react = require("react");
/**
 * Attaches an event listener to a `VideoPlayer` instance for a specified event.
 *
 * @param player - The player to attach the event to
 * @param event - The name of the event to attach the callback to
 * @param callback - The callback for the event
 */
const useEvent = (player, event, callback) => {
  (0, _react.useEffect)(() => {
    player.addEventListener(event, callback);
    return () => player.removeEventListener(event, callback);
  }, [player, event, callback]);
};
exports.useEvent = useEvent;
//# sourceMappingURL=useEvent.js.map