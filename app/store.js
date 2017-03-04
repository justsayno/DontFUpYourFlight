import { combineReducers, compose, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from './modules/auth'

const rootReducer = combineReducers({
  auth,
  formReducer
})

let store
const enhancers = []
if (__DEV__) {
    // Development mode with Redux DevTools support enabled.
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Prevents Redux DevTools from re-dispatching all previous actions.
    shouldHotReload: false
  }) : compose
    // Create the redux store.
  store = createStore(rootReducer, composeEnhancers(...enhancers))
} else {
    // Production mode.
  store = createStore(rootReducer, compose(...enhancers))
}

export default store
