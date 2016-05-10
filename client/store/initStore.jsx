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
import userSettingsReducer from '../reducers/usersettings'

const middleware = routerMiddleware(browserHistory)

export const store = createStore(
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