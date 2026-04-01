import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    applyMiddleware(logger,thunk)
  );

  return store;
}
