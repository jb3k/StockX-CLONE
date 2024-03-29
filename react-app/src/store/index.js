import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import apparelReducer from './apparel';
import listingReducer from './listings';
import purchaseReducer from './purchase';
import searchReducer from './searchbar';
import session from './session'
import browsePageReducer from './browsePage';

const rootReducer = combineReducers({
  session,
  apparel: apparelReducer,
  listings: listingReducer,
  purchase: purchaseReducer,
  search: searchReducer,
  browse: browsePageReducer

});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  // const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk));
  // enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
