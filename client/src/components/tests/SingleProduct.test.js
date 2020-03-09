import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent } from '@testing-library/react'
import renderWithRedux from '../../test_utils/test_redux'
import SingleProduct from '../SingleProduct'
import { product } from '../../test_utils/test_products'

afterEach(cleanup)

describe('SingleProduct -component', () => {
    let component
    
    beforeEach(() => {
        component = renderWithRedux(<SingleProduct product={product}/>)
    })

    it('should display product details', () => {
        expect(component.getByTestId('img')).toBeDefined()
        expect(component.getByTestId('desc')).toHaveTextContent('Lihamakaronilaatikko 400g')
        expect(component.getByTestId('expiration')).toHaveTextContent('01.01.2020')
        expect(component.getByTestId('shopname')).toHaveTextContent('Test Shop')
        expect(component.getByTestId('shopaddress')).toHaveTextContent('Street 1, 00100 Helsinki')
        expect(component.getByTestId('shopphone')).toHaveTextContent('05012345678')
        expect(component.getByTestId('price')).toHaveTextContent(10)
        expect(component.getByTestId('originalprice')).toHaveTextContent(20)
        expect(component.getByTestId('discount')).toHaveTextContent(50)
    })

    it('cart button can be clicked', () => {
        const button = component.getByTestId('cartbutton')
        expect(button).toHaveTextContent('Add to Cart')
        expect(button).not.toHaveAttribute('disabled')

        fireEvent.click(button)
        expect(button).toHaveTextContent('In cart')
        expect(button).toHaveAttribute('disabled')
    })
})