import { store } from './store/initStore'
import { UPDATE_INVENTORY, UPDATE_LAST_CHANGED, UPDATE_AUTHENTICATION, UPDATE_TABLE_DATA, UPDATE_DETAIL_DATA, UPDATE_GRAPH_DATA } from './actionTypes'

/*
  actionCreators is an object that holds a function for each type of action in the app.

  The method names are within the object so they won't override the action types listed above.

  Because they happen to be the same name as the action types, it is easy to see if an action exists or not.
 */

const actionCreators = {
  UPDATE_INVENTORY: function(data){
    return {type: UPDATE_INVENTORY, inventory: data}
  },

  UPDATE_TABLE_DATA: function(data){
    return {type: UPDATE_TABLE_DATA, table: data}
  },

  UPDATE_GRAPH_DATA: function(data){
    return {type: UPDATE_GRAPH_DATA, graph: data}
  },

  UPDATE_AUTHENTICATION: function(data){
    return {type: UPDATE_AUTHENTICATION, status: data}
  },
  UPDATE_DETAIL_DATA: function(data){
    return {type: UPDATE_DETAIL_DATA, data:data}
  }
}

/*
  function smartDispatch
  Takes 2 parameters, 2 is for action type, the second is for data.
  
  This method should be used everywhere in the app whenever something is dispatch.
  The first reason for this is that it will automatically create the action object based on the action type
  given as the first parameter.

  The second reason is that it will throw an error if an invalid action type was sent.

  The third reason is that using this method will dispatch a second action that makes precise re-rendering
  possible by keeping track of which properties have been changed.

  The ternary at the beginning will check if the action type used has a correlating function and if it does,
  it will create an action object and dispatch it.
*/

export function smartDispatch(type, data){
  if(! actionCreators[type])
    throw new Error("invalid action type sent to dispatcher.jsx")

  store.dispatch({type: UPDATE_LAST_CHANGED, current: type})
  store.dispatch(actionCreators[type](data))
}
