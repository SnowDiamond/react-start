import React from 'react';
import { Route } from 'react-router';
import App from './main/components/App';
import SamplePage from './main/components/SamplePage';

const routes = () => {
  return (
    <Route path='/' component={App}>
      <Route path='/page' component={SamplePage} />
    </Route>
  );
};

export default routes;
