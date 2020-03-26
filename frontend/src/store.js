import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './pages/reducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
