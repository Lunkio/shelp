const productReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_PRODUCTS':
            return action.data
        default: return state
    }
}

export const initializeProducts = (products) => {
    return {
        type: 'INIT_PRODUCTS',
        data: products
    }
}

export default productReducer