"use strict";

import { ALL_PLAYER_EVENTS } from "./types/Events.js";
export class VideoPlayerEvents {
  eventListeners = {};
  supportedEvents = ALL_PLAYER_EVENTS;
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
    for (const event of this.supportedEvents) {
      // @ts-expect-error we narrow the type of the event
      this.eventEmitter[event] = this.triggerEvent.bind(this, event);
    }
  }
  triggerEvent(event, ...params) {
    if (!this.eventListeners[event]?.size) return false;
    for (const fn of this.eventListeners[event]) {
      fn(...params);
    }
    return true;
  }
  addEventListener(event, callback) {
    this.eventListeners[event] ??= new Set();
    this.eventListeners[event].add(callback);
  }
  removeEventListener(event, callback) {
    this.eventListeners[event]?.delete(callback);
  }

  /**
   * Clears all events from the event emitter.
   */
  clearAllEvents() {
    this.supportedEvents.forEach(event => {
      this.clearEvent(event);
    });
  }

  /**
   * Clears a specific event from the event emitter.
   * @param event - The name of the event to clear.
   */
  clearEvent(event) {
    this.eventListeners[event]?.clear();
  }
}
//# sourceMappingURL=VideoPlayerEvents.js.map