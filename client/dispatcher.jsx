import { store } from './store/initStore'
import * as actions from './actionTypes'

/*
  function smartDispatch
  Takes 2 parameters, first is for action type, the second is for data.
  
  This method should be used everywhere in the app whenever something is dispatch.
  The first reason for this is that it will automatically create the action object based on the action type
  given as the first parameter.

  The second reason is that it will throw an error if an invalid action type was sent.

  The third reason is that using this method will dispatch a second action that makes precise re-rendering
  possible by keeping track of which properties have been changed.
*/

export function smartDispatch(type, data){
  if(! actions[type])
    throw new Error("invalid action type sent to dispatcher.jsx")

  store.dispatch({type: actions.UPDATE_LAST_CHANGED, data: type})
  store.dispatch({type: type, data:data})
}
