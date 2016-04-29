import initialState from '../store/initialState'
import { UPDATE_GRAPH_DATA } from '../actionTypes'

export default function(state = initialState, action) {

  switch(action.type){
    case UPDATE_GRAPH_DATA:
      return action.data
      break

    default:
      return state
  }
}
