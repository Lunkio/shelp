import cartReducer from './cartReducer'
import deepFreeze from 'deep-freeze'
import { product, products } from '../test_utils/test_products'

describe('cartReducer', () => {
    it('returns new state with action ADD', () => {
        const state = []
        const action = {
            type: 'ADD',
            data: product
        }

        deepFreeze(state)
        const newState = cartReducer(state, action)

        expect(newState.length).toBe(1)
        expect(newState).toContainEqual(action.data)
    })

    it('returns new state with action REMOVE', () => {
        const state = products
        const action = {
            type: 'REMOVE',
            data: products[1].id
        }

        deepFreeze(state)
        const newState = cartReducer(state, action)
        
        expect(newState.length).toBe(1)
        expect(newState).not.toContainEqual(products[1])
    })

    it('returns new state with action EMPTY_CART', () => {
        const state = [product]
        const action = {
            type: 'EMPTY_CART',
            data: []
        }

        deepFreeze(state)
        const newState = cartReducer(state, action)

        expect(newState.length).toBe(0)
    })
})