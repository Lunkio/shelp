import confirmReducer from './confirmReducer'
import deepFreeze from 'deep-freeze'

describe('confirmReducer', () => {
    it('returns new state with action NEW_CONFIRM', () => {
        const state = []
        const action = {
            type: 'NEW_CONFIRM',
            data: 'Confirm message'
        }

        deepFreeze(state)
        const newState = confirmReducer(state, action)

        expect(newState).toEqual(action.data)
    })

    it('returns new state with action HIDE_CONFIRM', () => {
        const state = []
        const action = {
            type: 'HIDE_CONFIRM'
        }

        deepFreeze(state)
        const newState = confirmReducer(state, action)
        
        expect(newState).toEqual('')
    })
})