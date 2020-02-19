import paymentReducer from './paymentReducer'
import deepFreeze from 'deep-freeze'
import { product } from '../test_utils/test_products'

describe('paymentReducer', () => {
    it('returns new state with action ADD_PRODUCT_TO_PAYMENT', () => {
        const state = []
        const action = {
            type: 'ADD_PRODUCT_TO_PAYMENT',
            data: product
        }

        deepFreeze(state)
        const newState = paymentReducer(state, action)

        expect(newState.length).toBe(1)
        expect(newState).toContainEqual(action.data)
    })

    it('returns new state with action EMPTY_PAYMENT', () => {
        const state = [product]
        const action = {
            type: 'EMPTY_PAYMENT',
            data: []
        }

        deepFreeze(state)
        const newState = paymentReducer(state, action)

        expect(newState.length).toBe(0)
    })
})