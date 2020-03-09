import React from 'react'
import { render } from '@testing-library/react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import productsReducer from '../reducers/productsReducer'
import shopsReducer from '../reducers/shopsReducer'
import cartReducer from '../reducers/cartReducer'
import alertReducer from '../reducers/alertReducer'
import confirmReducer from '../reducers/confirmReducer'
import shopLoginReducer from '../reducers/shopLoginReducer'
import paymentReducer from '../reducers/paymentReducer'

const reducers = combineReducers({
    products: productsReducer,
    shops: shopsReducer,
    cart: cartReducer,
    alert: alertReducer,
    confirm: confirmReducer,
    shopLogin: shopLoginReducer,
    payment: paymentReducer
})

export default function renderWithRedux(
    component,
    { initialState, store = createStore(reducers, applyMiddleware(thunk), initialState) } = {}
) {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store
    }
}