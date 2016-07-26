import initialState from '../store/initialState';
import { CHANGE_TAB } from '../actionTypes';

/**
 * Reducer for tab changes
 * @function tabReducer
 * @param {Object} state
 * @param {string} action
 * @return new value for this store property or default state
 */

export default function(state = initialState.tab, action) {
  switch (action.type) {
    case CHANGE_TAB:
      return action.data;

    default:
      return state;
  }
}
