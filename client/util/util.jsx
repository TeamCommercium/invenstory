import { push } from 'react-router-redux'
import { store } from '../store/initStore'

export function redirect(address){
  return function (address){
    store.dispatch(push(address))
  }.bind(null, address)
}

export function hardRedirect(address){
  return function (address){
    window.location.href = address
  }.bind(null, address)
}