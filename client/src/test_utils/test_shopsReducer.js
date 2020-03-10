import { shops } from './test_shops'

const shopsTestReducer = (state = [shops[0], shops[1]], action) => {
    switch(action.type) {
        default: return state
    }
}

export default shopsTestReducer