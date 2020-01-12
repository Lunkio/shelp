const cartReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD':
            return [...state, action.data]
        default: return state
    }
}

export const addToCart = (product) => {
    return {
        type: 'ADD',
        data: product
    }
}

export default cartReducer