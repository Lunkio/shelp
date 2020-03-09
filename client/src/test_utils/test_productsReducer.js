import { product, products } from './test_products'

const productTestReducer = (state = [product, products[0], products[1]], action) => {
    switch(action.type) {
        case 'INIT_PRODUCTS':
            return action.data
        default: return state
    }
}

export default productTestReducer