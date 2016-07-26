import initialState from '../store/initialState';
import { UPDATE_LAST_CHANGED } from '../actionTypes';

/**
 * Reducer for last changed property in the store
 * @function lastChangedReducer
 * @param {Object} state
 * @param {string} action
 * @return new value for this store property or default state
 */

export default function(state = initialState.lastChanged, action) {
  switch (action.type) {
    case UPDATE_LAST_CHANGED:
      return action.data;

    default:
      return state;
  }
}
