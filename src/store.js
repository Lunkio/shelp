import { createStore, combineReducers } from 'redux'
import productsReducer from './reducers/productsReducer'
import shopsReducer from './reducers/shopsReducer'

const reducers = combineReducers({
    products: productsReducer,
    shops: shopsReducer
})

const store = createStore(reducers)

export default store