import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Login from '../routes/Login';
import AuthenticatedRouter from '../routes/AuthenticatedRouter';
import NotFound from '../containers/NotFound';

import store from '../store/index';

import '../index.css';

const App = () => (
  <Provider store={store}>
    <SnackbarProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" component={AuthenticatedRouter} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </SnackbarProvider>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  );
});
