import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';

const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('app')
);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./main/reducers', () => {
    store.replaceReducer(require('./main/reducers').default);
  });
}
