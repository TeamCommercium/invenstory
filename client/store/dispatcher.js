import * as actions from '../actionTypes';

/**
 * This method will dispatch a second action that makes precise re-rendering
 * possible by keeping track of which properties have been changed.
 *
 * Will automatically create the action object based on the action type
 * given as the first parameter.
 *
 * @function smartDispatch
 * @param {string} type - Name of the action you wish to dispatch
 * @param {*} data - Payload to be sent to reducer.
 * @throws Invalid action type sent to dispatcher.jsx
 * @this defaultStore
 * @return undefined
 */

export default function smartDispatch(type, data) {
  if (! actions[type]) {
    throw new Error('Invalid action type sent to dispatcher.jsx');
  }

  this.dispatch({ type: actions.UPDATE_LAST_CHANGED, data: type });
  this.dispatch({ type, data });
}
