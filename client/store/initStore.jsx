import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware, routerReducer } from 'react-router-redux'

import inventoryReducer from '../reducers/inventory'
import initialState from './initialState'

const middleware = routerMiddleware(browserHistory)

export const store = createStore(
  combineReducers({
    lastChanged: inventoryReducer,
    inventory: inventoryReducer,
    routing: routerReducer
  }),
  initialState,
  applyMiddleware(middleware)
)