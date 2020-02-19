const paymentReducer = (state = [] , action) => {
    switch(action.type) {
        case 'ADD_PRODUCT_TO_PAYMENT':
            return [...state, action.data]
        case 'EMPTY_PAYMENT':
            return action.data
        default: return state
    }
}

export const addProductToPayment = (product) => {
    return dispatch => {
        dispatch({
            type: 'ADD_PRODUCT_TO_PAYMENT',
            data: product
        })
    }
}

export const emptyPayment = () => {
    return dispatch => {
        dispatch({
            type: 'EMPTY_PAYMENT',
            data: []
        })
    }
}

export default paymentReducer