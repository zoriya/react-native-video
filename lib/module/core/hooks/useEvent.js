"use strict";

import { useEffect } from 'react';
/**
 * Attaches an event listener to a `VideoPlayer` instance for a specified event.
 *
 * @param player - The player to attach the event to
 * @param event - The name of the event to attach the callback to
 * @param callback - The callback for the event
 */
export const useEvent = (player, event, callback) => {
  useEffect(() => {
    player.addEventListener(event, callback);
    return () => player.removeEventListener(event, callback);
  }, [player, event, callback]);
};
//# sourceMappingURL=useEvent.js.map