import React from 'react'
import ReactDOM from 'react-dom'
import { createHashHistory } from 'history'
import { Router, Route, Redirect, IndexRoute, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import HomeContainer from './containers/home'
import DashboardContainer from './containers/dashboard'
import LoginContainer from './components/login'
import { store } from './store/initStore'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
const history = syncHistoryWithStore(appHistory, store)

ReactDOM.render(
  <Router history={history}> 
    <Redirect from='/' to='/home' />
    <Route path='/home'component={HomeContainer}/>
    <Route path='/dashboard' component={DashboardContainer} />
    <Route path='/login' component={LoginContainer} />
  </Router>,
  document.getElementById('app')
)
//    <Route path='/' component={HomeContainer}/>
