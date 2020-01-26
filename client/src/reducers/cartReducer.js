const cartReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD':
            return [...state, action.data]
        case 'REMOVE':
            return state.filter(p => p.id !== action.data)
        case 'EMPTY_CART':
            return action.data
        default: return state
    }
}

export const addToCart = (product) => {
    return {
        type: 'ADD',
        data: product
    }
}

export const removeFromCart = (id) => {
    return {
        type: 'REMOVE',
        data: id
    }
}

export const emptyCart = () => {
    return {
        type: 'EMPTY_CART',
        data: []
    }
}

export default cartReducer