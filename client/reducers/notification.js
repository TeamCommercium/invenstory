import initialState from '../store/initialState';
import { UPDATE_NOTIFICATIONS } from '../actionTypes';

/**
 * Reducer for notifications
 * @function notificationReducer
 * @param {Object} state
 * @param {string} action
 * @return new value for this store property or default state
 */

export default function(state = initialState.notifications, action) {
  switch (action.type) {
    case UPDATE_NOTIFICATIONS:
      return action.data;

    default:
      return state;
  }
}
