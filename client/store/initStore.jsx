import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware, routerReducer } from 'react-router-redux'

// import { startingReducer } from '../reducers/starting'
// import InitialState from './initialState'

const middleware = routerMiddleware(browserHistory)

export const store = createStore(
  combineReducers({
    routing: routerReducer
  }),
  applyMiddleware(middleware)
)