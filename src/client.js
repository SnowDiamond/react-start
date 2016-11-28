import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';

const initialState = window.REDUX_INITIAL_STATE;
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

const renderApp = appRoutes => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Router key={Math.random()} history={history}>
          {appRoutes()}
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

renderApp(routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;

    renderApp(newRoutes);
  });
}
