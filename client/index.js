import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import Navbar from './containers/navbar.jsx'
import Home from './components/home.jsx'
import startingReducer from './reducers/starting.jsx'

// Apply the middleware to the store
const middleware = routerMiddleware(browserHistory)
const store = createStore(
  combineReducers({
    starting: startingReducer,
    routing: routerReducer
  }),
  applyMiddleware(middleware)
)


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Navbar}>
      <Route path="home" component={Home}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
