import * as React from 'react';
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Calculator from '../components/Calculator';

import { expect } from 'chai';
import { mount } from 'enzyme';

describe('Calculator Test', function () {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const calcState: any = {
        purchase: {
           isFetching: false,
            didInvalidate: false,
            items: {USD: 1,MXN:18.833798},
            transactions: [],
            calculatorData: {
                fromCurrency: "USD",
                toCurrency: "MXN"
            },
            value: 25,
            listCurrency: "USD"
        }
    };
    const store: any = mockStore(calcState)
    const wrapper = mount(
        <Provider store={store}>
            <Calculator />
        </Provider>);

    it('Should fetch currencies', function () {
        const actions = store.getActions();
        expect(actions).to.deep.equal([{ type: 'FETCH_RATES' }])
    });
    
    it("Should show default currencies", function () {
       
        expect(wrapper.find('select#from-currency').html()).to.match(/USD/ig);
    })

    it("Should convert 25 USD to MXN and show rate",function(){
        const formText:string=wrapper.find('form').text();
        expect(formText).to.match(/470\.84495/);
        expect(formText).to.match(/18\.833798/);
        
    });
    
});



