import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup } from '@testing-library/react'
import renderWithRedux from '../../test_utils/test_redux'
import { createStore, combineReducers } from 'redux'
import Products from '../Products'
import productsTestReducer from '../../test_utils/test_productsReducer'
import shopsTestReducer from '../../test_utils/test_shopsReducer'
import cartReducer from '../../reducers/cartReducer'

// Ei toimi, koska Product-komponentissa tarvitaan react-selectin ominaisuutta onChange,
// joka muutta staten tilaa
// jest.mock('react-select', () => ({ options, value, onChange }) => {
//     function handleChange(event) {
//         const option = options.find(
//             option => option.value === event.currentTarget.value
//         )
//         onChange(option)
//     }

//     return (
//         <select data-testid='custom-select' value={value} onChange={handleChange}>
//             {options.map(({ label, value }) => (
//                 <option key={value} value={value}>
//                     {label}
//                 </option>
//             ))}
//         </select>
//     )
// })

afterEach(cleanup)

describe('Products -component', () => {

    it('renders no products when none on sale', () => {
        let component = renderWithRedux(<Products />)
        expect(component.container).toHaveTextContent('There are currently no products on sale, please check again later')
    })

    describe('when products on sale', () => {
        let newComponent

        beforeEach(() => {
            const store = createStore(combineReducers({
                products: productsTestReducer,
                shops: shopsTestReducer,
                cart: cartReducer
            }))
            newComponent = renderWithRedux(<Products />, { store })
        })

        it('renders products that are on sale', () => {        
            const products = newComponent.getByTestId('products')
            expect(products.children.length).toBe(3)
        })

        // it('filter correct products when certain shop selected', () => {
        //     fireEvent.change(newComponent.getByTestId('custom-select'), {
        //         target: { value: shops[0].name }
        //     })
        //     const products = newComponent.getByTestId('products')
        //     expect(products.children.length).toBe(1)
        // })
    })
})