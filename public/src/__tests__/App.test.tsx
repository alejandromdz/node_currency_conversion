import * as React from 'react';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'

import App from '../components/App';

import purchase from '../reducers/purchase';
import login from '../reducers/login';
import transaction from '../reducers/transaction';

import { expect } from 'chai';
import { mount } from 'enzyme';

const reducer = combineReducers({
    purchase,
    login,
    transaction
})
const store = createStore(reducer);

describe('App Test', function () {

     const wrapper =mount(
            <Provider store={store}>
                <App />
            </Provider>);
    it('Should show Login at beginning', function () {
       
        expect(wrapper.find('button').html()).to.match(/Login/ig);
    })
    it('Should Login', function () {
       
        expect(wrapper.find('button').html()).to.match(/Login/ig);
    })
})