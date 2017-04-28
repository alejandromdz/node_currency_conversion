import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { Provider } from 'react-redux';

import App from '../components/App';

import { expect } from 'chai';

describe('App Test', function () {
    it('Test', function () {
        expect(true).equals(true);
    })
})