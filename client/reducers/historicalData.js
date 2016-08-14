import initialState from '../store/initialState';
import { UPDATE_HISTORICAL_DATA } from '../actionTypes';

/**
 * Reducer for Historical Data
 * @function historicalDataReducer
 * @param {Object} state
 * @param {string} action
 * @return new value for this store property or default state
 */

export default function(state = initialState.userSettings, action) {
  switch (action.type) {
    case UPDATE_HISTORICAL_DATA:
      return action.data;

    default:
      return state;
  }
}
