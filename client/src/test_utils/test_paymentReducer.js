import { product } from './test_products'

const paymentTestReducer = (state = [product] , action) => {
    switch(action.type) {
        default: return state
    }
}

export default paymentTestReducer