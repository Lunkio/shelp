const shopsReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_SHOPS':
            return action.data
        default: return state
    }
}

export const initializeShops = (shops) => {
    return {
        type: 'INIT_SHOPS',
        data: shops
    }
}

export default shopsReducer