import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { cleanup } from '@testing-library/react'
import renderWithRedux from '../../test_utils/test_redux'
import { createStore, combineReducers } from 'redux'
import PaymentCancel from '../cart/PaymentCancel'
import cartReducer from '../../reducers/cartReducer'

afterEach(cleanup)

describe('PaymentCancel -component', () => {

    it('if cart is empty, redirects to Home', () => {
        const store = createStore(combineReducers({
            cart: cartReducer
        }))
        const component = renderWithRedux(<Router><PaymentCancel /></Router>, { store })
        expect(component.queryByTestId('cancel')).toBeNull()
    })
})