import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

// import reducers here
// ----------------------

const rootReducer = combineReducers({
  state: (state = {}) => state,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk));

export default store;
