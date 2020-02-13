import shopsService from '../services/shopsService'

const shopsReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_SHOPS':
            return action.data
        default: return state
    }
}

export const initializeShops = () => {
    return async dispatch => {
        const shops = await shopsService.getAllShops()
        dispatch({
            type: 'INIT_SHOPS',
            data: shops
        })
    }
}

export default shopsReducer