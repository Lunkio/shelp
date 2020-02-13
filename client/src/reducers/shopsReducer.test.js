import shopsReducer from './shopsReducer'
import deepFreeze from 'deep-freeze'
import { shops } from '../test_utils/test_shops'

describe('shopsReducer', () => {
    it('returns new state with action INIT_SHOPS', () => {
        const state = []
        const action = {
            type: 'INIT_SHOPS',
            data: shops
        }

        deepFreeze(state)
        const newState = shopsReducer(state, action)

        expect(newState.length).toBe(2)
        expect(newState).toEqual(action.data)
    })
})