import { createStore, combineReducers } from 'redux'
import productsReducer from './reducers/productsReducer'
import shopsReducer from './reducers/shopsReducer'
import cartReducer from './reducers/cartReducer'

const reducers = combineReducers({
    products: productsReducer,
    shops: shopsReducer,
    cart: cartReducer
})

const store = createStore(reducers)

export default store