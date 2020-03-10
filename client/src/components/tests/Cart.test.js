import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { cleanup } from '@testing-library/react'
import renderWithRedux from '../../test_utils/test_redux'
import { createStore, combineReducers } from 'redux'
import Cart from '../cart/Cart'
import cartReducer from '../../reducers/cartReducer'
import cartTestReducer from '../../test_utils/test_cartReducer'

afterEach(cleanup)

describe('Cart -component', () => {

    it('if cart is empty, redirects to Home', () => {
        const store = createStore(combineReducers({
            cart: cartReducer
        }))
        const component = renderWithRedux(<Router><Cart /></Router>, { store })
        expect(component.container).toHaveTextContent('Cart is empty')
    })

    describe('when products in cart', () => {
        let component

        beforeEach(() => {
            const store = createStore(combineReducers({
                cart: cartTestReducer
            }))
            component = renderWithRedux(<Router><Cart /></Router>, { store })
        })

        it('shows cart descriptions', () => {
            expect(component.container).toHaveTextContent('Shopping Cart')
            const descriptions = component.getByTestId('cart-desc')
            expect(descriptions.children.length).toBe(3)
        })

        it('renders products in cart', () => {
            const products = component.getByTestId('cart-products')
            expect(products.children.length).toBe(1)
        })
    })
})