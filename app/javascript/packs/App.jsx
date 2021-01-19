import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {SnackbarProvider} from 'notistack';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';


import Login from '../routes/Login';

import store from '../store/index';

const App = () => (
    <Provider store={store}>
        <SnackbarProvider>
            <Router>
                <Route exact path="/login" component={Login} />
            </Router>
        </SnackbarProvider>
    </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
