import initialState from '../store/initialState';
import { UPDATE_DETAIL_DATA } from '../actionTypes';

/**
 * Reducer for detailed item data
 * @function detailReducer
 * @param {Object} state
 * @param {string} action
 * @return new value for this store property or default state
 */
export default function(state = initialState.detail, action) {
  switch (action.type) {
    case UPDATE_DETAIL_DATA:
      return action.data;

    default:
      return state;
  }
}
