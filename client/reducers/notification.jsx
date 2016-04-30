import initialState from '../store/initialState'
import { UPDATE_NOTIFICATIONS } from '../actionTypes'

export default function(state = initialState, action) {

  switch(action.type){
    case UPDATE_NOTIFICATIONS:
      return action.data
      break

    default:
      return state
  }
}
