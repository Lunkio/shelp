import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import productsReducer from './reducers/productsReducer'
import shopsReducer from './reducers/shopsReducer'
import cartReducer from './reducers/cartReducer'
import alertReducer from './reducers/alertReducer'
import confirmReducer from './reducers/confirmReducer'
import shopLoginReducer from './reducers/shopLoginReducer'

const reducers = combineReducers({
    products: productsReducer,
    shops: shopsReducer,
    cart: cartReducer,
    alert: alertReducer,
    confirm: confirmReducer,
    shopLogin: shopLoginReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store