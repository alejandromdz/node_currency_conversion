import * as React from 'react';
import { render } from 'react-dom';
import { createStore,combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { App } from './components/App';
import purchase from './reducers/purchase';

const reducer=combineReducers({
    purchase
})
const store = createStore(reducer);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);