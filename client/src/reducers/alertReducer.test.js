import alertReducer from './alertReducer'
import confirmReducer from './confirmReducer'
import deepFreeze from 'deep-freeze'

describe('alertReducer', () => {
    it('returns new state with action NEW_ALERT', () => {
        const state = []
        const action = {
            type: 'NEW_ALERT',
            data: 'Alert message'
        }

        deepFreeze(state)
        const newState = alertReducer(state, action)

        expect(newState).toEqual(action.data)
    })

    it('returns new state with action HIDE_ALERT', () => {
        const state = []
        const action = {
            type: 'HIDE_ALERT'
        }

        deepFreeze(state)
        const newState = alertReducer(state, action)
        
        expect(newState).toEqual('')
    })
})