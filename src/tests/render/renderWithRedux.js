import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers';

export const renderWithRedux = (
    component,
    {
      initialState = {},
      store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)),
      initialEntries = ['/'],
      history = createMemoryHistory({ initialEntries }),
    } = {}) => ({
      ...render(
      <Provider store={ store }>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>
      ),
      store,
      history,
});
