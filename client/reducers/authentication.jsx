import initialState from '../store/initialState'
import { UPDATE_AUTHENTICATION } from '../actionTypes'

export default function(state = initialState, action) {

  switch(action.type){
    case UPDATE_AUTHENTICATION:
      return action.status
      break

    default:
      return state
  }
}
