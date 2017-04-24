import * as React from 'react';
import { render } from 'react-dom';
import { createStore,combineReducers,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk';

import { App } from './components/App';
import purchase from './reducers/purchase';

const midleware=applyMiddleware(thunk,createLogger())
const reducer=combineReducers({
    purchase
})
const store = createStore(reducer,midleware);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);