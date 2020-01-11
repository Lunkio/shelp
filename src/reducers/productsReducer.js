const productReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT':
            return action.data
        default: return state
    }
}

export const initializeProducts = (products) => {
    return {
        type: 'INIT',
        data: products
    }
}

export default productReducer