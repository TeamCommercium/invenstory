import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware, routerReducer } from 'react-router-redux'

import notificationReducer from '../reducers/notification'
import tabReducer from '../reducers/tab'
import detailReducer from '../reducers/detail'
import tableDataReducer from '../reducers/table'
import graphDataReducer from '../reducers/graph'
import pieChartDataReducer from '../reducers/pieChart'
import authenticationReducer from '../reducers/authentication'
import lastChangedReducer from '../reducers/lastChanged'
import initialState from './initialState'
import { subscribeTo } from './subscribeTo'
import smartDispatch from './dispatcher'
import Backlog from './Backlog'

const middleware = routerMiddleware(browserHistory)

const defaultStore = createStore(
  combineReducers({
    tableData: tableDataReducer,
    graphData: graphDataReducer,
    pieChartData: pieChartDataReducer,
    authenticated: authenticationReducer,
    lastChanged: lastChangedReducer,
    detail: detailReducer,
    routing: routerReducer,
    notifications: notificationReducer,
    tab: tabReducer,
    userSettings: userSettingsReducer
  }),
  initialState,
  applyMiddleware(middleware)
)

const backlog = new Backlog({ 
  subscribeTo: subscribeTo.bind(defaultStore),
  smartDispatch: smartDispatch.bind(defaultStore)
});

export const store = Object.assign({}, defaultStore, backlog)
