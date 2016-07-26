import initialState from '../store/initialState'
import { UPDATE_PIECHART_DATA } from '../actionTypes'

/**
 * Reducer for pie chart data
 * @function pieChartReducer
 * @param {Object} state
 * @param {string} action
 * @return new value for this store property or default state
 */

export default function(state = initialState.pieChartData, action) {

  switch(action.type){
    case UPDATE_PIECHART_DATA:
      return action.data
      break

    default:
      return state
  }
}
