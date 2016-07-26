import action from './propActions';

/**
 * Invoked when an action is dispatched and affects the property it was registered with.
 *
 * @callback subscribeCallback
 * @param {Object} newState - A fresh copy of the newly updated store
 */

/**
 * Wraps the store's subscribe method and only calls your callback when
 * the most recently changed property matches the string you enterred as a property.
 * This is intended to prevent unneeded re-renders by only triggering when needed.
 *
 * @function subscribeTo
 * @param {string} property - The store property name the callback will be bound to
 * @param {subscribeCallback} callback - The callback that handles new state.
 * @return undefined
 * @throws Tried to subscribe to __ but it didn't match any of the known store properties.
 * @this defaultStore
 * @return undefined
 */

export function subscribeTo(property, callback) {
  const store = this;

  if (! action[property]) {
    throw new Error(`Tried to subscribe to ${property} but it didn't match any of the known store properties.`);
  }
  
  store.subscribe(() => {
    const tempState = store.getState();
    const changed = tempState.lastChanged;

    if (action[property][changed]) {
      callback(tempState);
    }
  });
}
