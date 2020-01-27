const confirmReducer = (state = '', action) => {
    switch(action.type) {
        case 'NEW_CONFIRM':
            return action.data
        case 'HIDE_CONFIRM':
            return state = ''
        default: return state
    }
}

export const setConfirm = (content, duration) => {
    return dispatch => {
        dispatch({
            type: 'NEW_CONFIRM',
            data: content
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE_CONFIRM'
            })
        }, duration * 1000)
    }
}

export default confirmReducer