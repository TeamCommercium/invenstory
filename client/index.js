import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import { Router, Route, browserHistory } from 'react-router'
// import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from 'react-router-redux'
// import { createStore, combineReducers, applyMiddleware } from 'redux'
import Navbar from './components/navbar.jsx'
// import Home from './components/home.jsx'
// import startingReducer from './reducers/starting.jsx'

// Add the reducer to your store on the `routing` key
// const store = createStore(
//   combineReducers({
//     starting: startingReducer,
//     routing: routerReducer
//   })
// )

// // Apply the middleware to the store
// const middleware = routerMiddleware(browserHistory)
// const store = createStore(
//   combineReducers({
//     starting: startingReducer,
//     routing: routerReducer
//   }),
//   applyMiddleware(middleware)
// )

// Dispatch from anywhere like normal.


// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store)

// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history}>
//       <Route path="/" component={Navbar} />
//     </Router>
//   </Provider>,
//   document.getElementById('app')
// )

  ReactDOM.render(
        <Navbar />,
    document.getElementById('app')
  )


// store.dispatch(push('/home'))
