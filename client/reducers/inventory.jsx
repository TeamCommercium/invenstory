import initialState from '../store/initialState'

export default function(state = initialState, action) {

  console.log("I'm the reducer and the state is " + state + ". Also state === initialState is:",state === initialState);

  switch(action.type){
    case 'UPDATE_INVENTORY':
      return Object.assign({}, state, {
        inventory: action.inventory
      },{
        lastChanged: "inventory"
      })
    break;

    case 'TEST':
      return Object.assign({}, state, {
        inventory: "probably worked"
      },{
        lastChanged: "test"
      })

    default:
      return state;
  }
}
