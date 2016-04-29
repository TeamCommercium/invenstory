import initialState from '../store/initialState'
import { UPDATE_TABLE_DATA } from '../actionTypes'

export default function(state = initialState, action) {

  switch(action.type){
    case UPDATE_TABLE_DATA:
      return action.data
      break

    default:
      return state
  }
}
