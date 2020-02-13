import shopLoginReducer from './shopLoginReducer'
import deepFreeze from 'deep-freeze'
import { shop } from '../test_utils/test_shops'

describe('shopLoginReducer', () => {
    it('returns new state with action LOGIN_SHOP', () => {
        const state = {}
        const action = {
            type: 'LOGIN_SHOP',
            data: shop
        }

        deepFreeze(state)
        const newState = shopLoginReducer(state, action)

        expect(newState).toEqual(action.data)
    })

    it('returns new state with action LOGOUT_SHOP', () => {
        const state = shop
        const action = {
            type: 'LOGOUT_SHOP'
        }

        deepFreeze(state)
        const newState = shopLoginReducer(state, action)

        expect(newState).toEqual(null)
    })
})