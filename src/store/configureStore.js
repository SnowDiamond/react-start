import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'main/reducers';
import DevTools from 'modules/widgets/devTools';
import Async from 'middlewares/async';

export default function (initialState = {}) {
  let middleWare;

  if (process.env.NODE_ENV === 'development') {
    middleWare = compose(applyMiddleware(thunk, Async), DevTools.instrument());
  } else {
    middleWare = applyMiddleware(thunk, Async);
  }

  const store = createStore(rootReducer, initialState, middleWare);

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('main/reducers', () =>
      store.replaceReducer(require('main/reducers').default)
    );
  }

  return store;
}
