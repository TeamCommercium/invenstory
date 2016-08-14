import initialState from '../store/initialState';
import { UPDATE_LAST_CHANGED_DETAIL_ID } from '../actionTypes';

/**
 * Reducer for detailed item data
 * @function detailReducer
 * @param {Object} state
 * @param {string} action
 * @return new value for this store property or default state
 */
export default function(state = initialState.lastDetailId, action) {
  switch (action.type) {
    case UPDATE_LAST_CHANGED_DETAIL_ID:
      return action.data;

    default:
      return state;
  }
}
