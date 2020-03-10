import { product } from './test_products'

const cartTestReducer = (state = [product], action) => {
    switch(action.type) {
        default: return state
    }
}

export default cartTestReducer