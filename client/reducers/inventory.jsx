import initialState from '../store/initialState'
import { UPDATE_INVENTORY } from '../actionTypes'

export default function(state = initialState, action) {

  switch(action.type){
    case UPDATE_INVENTORY:
      return action.inventory
      break

    default:
      return state
  }
}
