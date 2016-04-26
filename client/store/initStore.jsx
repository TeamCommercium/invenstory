import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware, routerReducer } from 'react-router-redux'

import tableDataReducer from '../reducers/table'
import graphDataReducer from '../reducers/graph'
import inventoryReducer from '../reducers/inventory'
import authenticationReducer from '../reducers/authentication'
import lastChangedReducer from '../reducers/lastChanged'
import initialState from './initialState'

const middleware = routerMiddleware(browserHistory)

export const store = createStore(
  combineReducers({
    tableData: tableDataReducer,
    graphData: graphDataReducer,
    authenticated: authenticationReducer,
    inventory: inventoryReducer,
    lastChanged: lastChangedReducer,
    routing: routerReducer
  }),
  initialState,
  applyMiddleware(middleware)
)