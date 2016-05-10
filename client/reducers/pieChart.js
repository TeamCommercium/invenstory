import initialState from '../store/initialState'
import { UPDATE_PIECHART_DATA } from '../actionTypes'

export default function(state = initialState, action) {

  switch(action.type){
    case UPDATE_PIECHART_DATA:
      return action.data
      break

    default:
      return state
  }
}
