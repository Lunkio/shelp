import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { cleanup } from '@testing-library/react'
import renderWithRedux from '../../test_utils/test_redux'
import { createStore, combineReducers } from 'redux'
import Home from '../Home'
import productsTestReducer from '../../test_utils/test_productsReducer'
import cartReducer from '../../reducers/cartReducer'

afterEach(cleanup)

describe('Home -component', () => {
    let component

    beforeEach(() => {
        component = renderWithRedux(<Router><Home /></Router>)
    })

    it('renders introduction texts', () => {
        expect(component.getByTestId('background-img')).toBeDefined()

        const introductionTexts = component.getByTestId('introduction-texts')
        expect(introductionTexts.children.length).toBe(2)

        const homeButtons = component.getByTestId('homebuttons')
        expect(homeButtons.children.length).toBe(2)

        expect(component.container).toHaveTextContent('Save as much as you can eat')
    })

    it('renders no products if zero on sale', () => {
        expect(component.getByTestId('home-no-products')).toBeDefined()        
        expect(component.container).toHaveTextContent('There are currently no products on sale, please check again later')
    })

    it('renders products that are on sale', () => {
        const store = createStore(combineReducers({
            products: productsTestReducer,
            cart: cartReducer
        }))
        const newComponent = renderWithRedux(<Router><Home /></Router>, { store })
        const products = newComponent.getByTestId('home-products')
        expect(products.children.length).toBe(3)
        expect(newComponent.container).toHaveTextContent('Our freshest offers!')
    })
})