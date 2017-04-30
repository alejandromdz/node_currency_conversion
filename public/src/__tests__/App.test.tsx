import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { renderIntoDocument, isDOMComponent } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'

import App from '../components/App';


import purchase from '../reducers/purchase';
import login from '../reducers/login';
import transaction from '../reducers/transaction';

import { expect } from 'chai';


const reducer = combineReducers({
    purchase,
    login,
    transaction
})
const store = createStore(reducer);

describe('App Test', function () {
    it('Should show Login at beginning', function () {
        const app: any = renderIntoDocument(
            <Provider store={store}>
                <App />
            </Provider>);
        const appNode = ReactDOM.findDOMNode(app);
        expect(appNode.innerHTML).to.match(/Login/ig);
    })
})