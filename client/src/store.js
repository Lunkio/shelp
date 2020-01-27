import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import productsReducer from './reducers/productsReducer'
import shopsReducer from './reducers/shopsReducer'
import cartReducer from './reducers/cartReducer'
import alertReducer from './reducers/alertReducer'
import confirmReducer from './reducers/confirmReducer'

const reducers = combineReducers({
    products: productsReducer,
    shops: shopsReducer,
    cart: cartReducer,
    alert: alertReducer,
    confirm: confirmReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store