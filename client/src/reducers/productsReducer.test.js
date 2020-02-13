import productReducer from './productsReducer'
import deepFreeze from 'deep-freeze'
import { products } from '../test_utils/test_products'

describe('productsReducer', () => {
    it('returns new state with action INIT_PRODUCTS', () => {
        const state = []
        const action = {
            type: 'INIT_PRODUCTS',
            data: products
        }

        deepFreeze(state)
        const newState = productReducer(state, action)

        expect(newState.length).toBe(2)
        expect(newState).toEqual(action.data)
    })
})