import { render } from '@testing-library/react';
import { composeWithDevTools } from '@redux-devtools/extension';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers';

export const renderWithRedux = (
    component,
    {
      initialState,
      store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk),),
        initialState)
    } = {}) => ({
      ...render(<Provider store={store}>{component}</Provider>),
      store
})