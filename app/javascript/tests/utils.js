import React from 'react';
import PropTypes from 'prop-types';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { createStore, INITIAL_STATE } from '../store/index';

const render = (
  elem,
  {
    initialState = INITIAL_STATE,
    store = createStore(initialState),
    initialRoute = '/',
    ...renderOptions
  } = {},
) => {
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={[initialRoute]}>
      <SnackbarProvider>
        <Provider store={store}>{children}</Provider>
      </SnackbarProvider>
    </MemoryRouter>
  );
  Wrapper.propTypes = { children: PropTypes.node.isRequired };
  return rtlRender(elem, { wrapper: Wrapper, ...renderOptions });
};

const mockStore = configureMockStore([
  ReduxThunk,
]);

export { render, mockStore };
