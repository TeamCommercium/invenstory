import initialState from '../store/initialState'
import { UPDATE_USER_SETTINGS } from '../actionTypes'

export default function(state = initialState, action) {

  switch(action.type){
    case UPDATE_USER_SETTINGS:
      return action.data
      break

    default:
      return state
  }
}