import React from 'react';
import PropTypes from 'prop-types';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';

import createStore, { INITIAL_STATE } from '../store/index';

const render = (
  elem,
  {
    initialState = INITIAL_STATE,
    store = createStore(initialState),
    ...renderOptions
  } = {},
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  Wrapper.propTypes = { children: PropTypes.node.isRequired };
  return rtlRender(elem, { wrapper: Wrapper, ...renderOptions });
};

const mockStore = configureMockStore([
  ReduxThunk,
]);

export { render, mockStore };
