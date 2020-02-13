import productsService from '../services/productsService'

const productReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_PRODUCTS':
            return action.data
        default: return state
    }
}

export const initializeProducts = () => {
    return async dispatch => {
        const products = await productsService.getAllProducts()
        dispatch({
            type: 'INIT_PRODUCTS',
            data: products
        })
    }
}

export default productReducer