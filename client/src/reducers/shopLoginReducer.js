const shopLoginReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN_SHOP':
            return action.data
        case 'LOGOUT_SHOP':
            return null
        default: return state
    }
}

export const loginShop = (shop) => {
    return async dispatch => {
        dispatch({
            type: 'LOGIN_SHOP',
            data: shop
        })
    }
}

export const logoutShop = () => {
    return async dispatch => {
        dispatch({
            type: 'LOGOUT_SHOP'
        })
    }
}

export const initializeShop = () => {
    return async dispatch => {
        const loggedInShop = window.localStorage.getItem('loggedInShop')
        if (loggedInShop) {
            const shop = JSON.parse(loggedInShop)
            dispatch({
                type: 'LOGIN_SHOP',
                data: shop
            })
        }
    }
}

export default shopLoginReducer