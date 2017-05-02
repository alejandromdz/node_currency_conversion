import * as React from 'react';
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import App from '../components/App';

import { expect } from 'chai';
import { mount } from 'enzyme';

describe('App Test', function () {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const appState={
        login: {
            isLogged: false,
            isRequesting: false,
            didInvalidate: false,
            formState: {
                username: '',
                password: ''
            }
        }
    };
    const store:any = mockStore(appState)
    const wrapper = mount(
<Provider store={store}>
        <App />
        </Provider>);

    it('Should show Login at beginning', function () {

        expect(wrapper.find('button').html()).to.match(/Login/ig);
    })
    it('Should Login', function () {
        wrapper.find('form.h-100').simulate('submit');
        const actions=store.getActions();
        expect(actions).to.deep.equal([ { type: 'LOGIN_REQUEST',
        payload: { username: '', password: '' } } ])
    })
})