import initialState from '../store/initialState'
import { UPDATE_USER_SETTINGS } from '../actionTypes'

/**
 * Reducer for user settings
 * @function userSettingsReducer
 * @param {Object} state
 * @param {string} action
 * @return new value for this store property or default state
 */
export default function(state = initialState, action) {

  switch(action.type){
    case UPDATE_USER_SETTINGS:
      return action.data
      break

    default:
      return state
  }
}