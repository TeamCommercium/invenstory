import initialState from '../store/initialState'

export default function(state = initialState, action) {

  switch(action.type){
    case 'UPDATE_INVENTORY':
      return Object.assign({}, state, {
        inventory: action.inventory,
        lastChanged: "INVENTORY"
      })
    break;

    default:
      return state;
  }
}
