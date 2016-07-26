import initialState from '../store/initialState';
import { UPDATE_GRAPH_DATA } from '../actionTypes';

/**
 * Reducer for graph data
 * @function graphDataReducer
 * @param {Object} state
 * @param {string} action
 * @return new value for this store property or default state
 */

export default function(state = initialState.graphData, action) {
  switch (action.type) {
    case UPDATE_GRAPH_DATA:
      return action.data;

    default:
      return state;
  }
}
