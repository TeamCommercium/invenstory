import React from 'react'
import ReactDOM from 'react-dom'
import { createHashHistory } from 'history'
import { Router, Route, Redirect, IndexRoute, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { redirect } from './util/util'

import Tabs from './containers/tabs'
import Login from './components/login'
import { store } from './store/initStore'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
const history = syncHistoryWithStore(appHistory, store)

ReactDOM.render(
  <Router history={history}> 
    <Route path='/'component={Tabs}/>
    <Route path='/login' component={<Login redirect={redirect}/>} />
  </Router>,
  document.getElementById('app')
)
