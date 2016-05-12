import * as actions from '../actionTypes'

/*
  function smartDispatch
  Takes 2 parameters, first is for action type, the second is for data.
  
  This method should be used whenever something is dispatched.
  
  Will automatically create the action object based on the action type
  given as the first parameter.

  Will throw an error if an invalid action type was sent.

  This method will dispatch a second action that makes precise re-rendering
  possible by keeping track of which properties have been changed.
*/

export default function smartDispatch(type, data){
  if(! actions[type])
    throw new Error("invalid action type sent to dispatcher.jsx")

  this.dispatch({type: actions.UPDATE_LAST_CHANGED, data: type})
  this.dispatch({type: type, data:data})
}
