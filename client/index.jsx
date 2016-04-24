import 'isomorphic-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import { createHashHistory } from 'history'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import HomeContainer from './containers/home'
import DashboardContainer from './containers/dashboard'
import LoginContainer from './containers/login'
import { store } from './store/initStore'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
const history = syncHistoryWithStore(appHistory, store)

ReactDOM.render(
  <Router history={history}> 
    <Route path='/' component={LoginContainer}/>
    <Route path='/home'component={HomeContainer}/>
    <Route path='/dashboard' component={DashboardContainer} />
  </Router>,
  document.getElementById('app')
)

