import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { cleanup } from '@testing-library/react'
import renderWithRedux from '../../test_utils/test_redux'
import { createStore, combineReducers } from 'redux'
import PaymentSuccess from '../cart/PaymentSuccess'
import paymentReducer from '../../reducers/paymentReducer'

afterEach(cleanup)

describe('PaymentSuccess -component', () => {

    it('if there\'s no payment, redirects to Home', () => {
        const store = createStore(combineReducers({
            payment: paymentReducer
        }))
        const component = renderWithRedux(<Router><PaymentSuccess /></Router>, { store })
        expect(component.queryByTestId('success')).toBeNull()
    })
})