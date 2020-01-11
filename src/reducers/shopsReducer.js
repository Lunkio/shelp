const shopsReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT':
            return action.data
        default: return state
    }
}

export const initializeShops = (shops) => {
    return {
        type: 'INIT',
        data: shops
    }
}

export default shopsReducer