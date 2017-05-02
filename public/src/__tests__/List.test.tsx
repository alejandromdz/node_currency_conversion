import * as React from 'react';
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import List from '../components/List';

import { expect } from 'chai';
import { mount } from 'enzyme';

describe('List Test', function () {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const listState: any = {
        purchase: {
            isFetching: false,
            didInvalidate: false,
            items: { USD: 1, MXN: 18.833798 },
            transactions: [{
                amount: 25,
                concept: 'Macys',
                date: '2017-04-27T05:35:07.333Z',
                transaction: 'Transfer'
            }],
            calculatorData: {
                fromCurrency: "USD",
                toCurrency: "MXN"
            },
            value: 25,
            listCurrency: "USD"
        },
        transaction: {
            isFetching: false,
            didInvalidate: false,
            transactionData: {
                transaction: 'Purchase',
                concept: 'DSW Shoes',
                amount: 0
            }
        }

    };
    const store: any = mockStore(listState)
    const wrapper = mount(
        <Provider store={store}>
            <List />
        </Provider>);

    it('Should fetch transactions', function () {
        const actions = store.getActions();
        expect(actions).to.deep.equal([{ type: 'FETCH_TRANSACTIONS' }])
    });

    it("Should show a transaction", function () {
        const tableText: string = wrapper.find('table tbody').text()
        expect(tableText).to.match(/26\/04\/2017/ig);
        expect(tableText).to.match(/Transfer\/Macys/ig);
        expect(tableText).to.match(/25.+\$.+USD/ig);
    })

    it("Should convert amounts from USD to MXN", function () {
        const store: any = mockStore({
            purchase: { ...listState.purchase, listCurrency: 'MXN' },
            transaction: { ...listState.transaction }
        })

        const wrapper = mount(
            <Provider store={store}>
                <List />
            </Provider>);
            
        const tableText: string = wrapper.find('table tbody').text()

        expect(tableText).to.match(/470\.84495.+\$.+MXN/);

    });

});



