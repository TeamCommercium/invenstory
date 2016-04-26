import initialState from '../store/initialState'
import { UPDATE_LAST_CHANGED } from '../actionTypes'

export default function(state = initialState, action) {

  switch(action.type){
    case UPDATE_LAST_CHANGED:
      return action.current
      break

    default:
      return state
  }
}
