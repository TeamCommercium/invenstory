import initialState from '../store/initialState'
import { UPDATE_TABLE_DATA } from '../actionTypes'

/**
 * Reducer for table data
 * @function tableReducer
 * @param {Object} state
 * @param {string} action
 * @return new value for this store property or default state
 */
export default function(state = initialState, action) {

  switch(action.type){
    case UPDATE_TABLE_DATA:
      return action.data
      break

    default:
      return state
  }
}
