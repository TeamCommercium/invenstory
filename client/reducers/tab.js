import initialState from '../store/initialState'
import { CHANGE_TAB } from '../actionTypes'

export default function(state = initialState, action) {

  switch(action.type){
    case CHANGE_TAB:
      return action.data
      break

    default:
      return state
  }
}
