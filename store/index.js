import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const logger = createLogger();
const composeEnhancers = compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware, logger)
);

const store = createStore(
  combineReducers({ rootReducer }),
  enhancer,
);

export default store;