import * as actionTypes from '../actions/actionTypes';

const initialState = {
    offers: null,
    offerErr: null,
    userOffers: null,
    userOffersErr: null, 
    page: 1,
    offerId: null,
    loading: false,
    sending: false,
    posted: false,
    deletingErr: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case actionTypes.FETCH_DATA_SUCCESS: 
            return {
                ...state,
                offers: action.offers
            }
        
        case actionTypes.FETCH_DATA_FAIL:
            return {
                ...state,
                offerErr: action.err 
            }

        case actionTypes.FETCH_USER_OFFERS_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.FETCH_USER_OFFERS_SUCCESS:
            return {
                ...state,
                userOffers: action.userOffers,
                loading: false
            }

        case actionTypes.FETCH_USER_OFFERS_FAIL:
            return {
                ...state,
                userOffersErr: action.err,
                loading: false
            }

        case actionTypes.CHANGE_PAGE:
            return {
                ...state,
                page: action.page
            }
            
        case actionTypes.POST_DATA_START:
            return {
                ...state,
                offers: null,
                sending: true,
                loading: true
            }
        
        case actionTypes.POST_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                posted: true,
                offerId: action.offerId
            }
        
        case actionTypes.POST_DATA_CLEAR: 
            return {
                ...state,
                loading: false,
                posted: false
            }
        
        case actionTypes.DELETE_DATA_FAIL:
            return {
                ...state,
                deletingErr: action.err
            }

        default: return state;
    }
}

export default reducer;