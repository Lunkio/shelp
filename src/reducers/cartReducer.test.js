import cartReducer from './cartReducer'
import deepFreeze from 'deep-freeze'
import { product } from '../test_utils/test_products'

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
})