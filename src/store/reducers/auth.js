import * as actionType from '../actions/actionTypes';

const initialState = {
    loading: false,
    modal: false,
    user: null,
    userErr: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actionType.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                userErr: action.err
            }
        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                modal: false,
                user: action.user,
                loading: false
            }
        case actionType.OPEN_MODAL:
            return {
                ...state,
                modal: true
            }
        case actionType.CLOSE_MODAL:
            return {
                ...state,
                modal: false
            }
    default: return state
    }
}

export default reducer