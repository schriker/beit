import * as actionType from './actionTypes';
const firebase = require('firebase');

const fetchDataFaild = (err) => {
    return {
        type: actionType.FETCH_DATA_FAIL,
        err: err
    }
}

const fetchDataSuccess = (offers) => {
    return {
        type: actionType.FETCH_DATA_SUCCESS,
        offers: offers
    }
}

export const fetchData = () => {
    return dispatch => {
        firebase.database().ref('/offers/').once('value')
        .then((val) => {
            const offers = val.val();
            dispatch(fetchDataSuccess(offers));
        })
        .catch((err) => dispatch(fetchDataFaild(err)));
    }
}

export const changePage = (page) => {
    return {
        type: actionType.CHANGE_PAGE,
        page: page
    }
}

const postDataStart = () => {
    return {
        type: actionType.POST_DATA_START
    }
}

const postDataSuccess = (offerId) => {
    return {
        type: actionType.POST_DATA_SUCCESS,
        offerId: offerId
    }
}

const postDataFaild = (err) => {
    return {
        type: actionType.POST_DATA_FAIL,
        err: err
    }
}

export const postData = (data, uid) => {
    return dispatch => {
        dispatch(postDataStart());
        let newOfferKey = firebase.database().ref('/').child('offers').push().key;
        let updates = {};
        updates['/offers/' + newOfferKey] = data;
        updates[`/${uid}/${newOfferKey}`] = data;

        firebase.database().ref().update(updates)
        .then(() => dispatch(postDataSuccess(newOfferKey)))
        .catch((err) => dispatch(postDataFaild(err)));    
    }
}

export const postDataClear = () => {
    return {
        type: actionType.POST_DATA_CLEAR
    }
}

const fetchUserOffersStart = () => {
    return {
        type: actionType.FETCH_USER_OFFERS_START
    }
}

const fetchUserOffersFaild = (err) => {
    return {
        type: actionType.FETCH_USER_OFFERS_FAIL,
        err: err
    }
}

const fetchUserOffersSuccess = (userOffers) => {
    return {
        type: actionType.FETCH_USER_OFFERS_SUCCESS,
        userOffers: userOffers
    }
}

export const fetchUserOffers = (uid) => {
    return dispatch => {
        dispatch(fetchUserOffersStart());
        firebase.database().ref(`/${uid}/`).once('value')
        .then((val) => {
            const userOffers = val.val();
            dispatch(fetchUserOffersSuccess(userOffers));
        })
        .catch((err) => dispatch(fetchUserOffersFaild(err)));
    }
}

const deleteDataStart = () => {
    return {
        type: actionType.DELETE_DATA_START
    }
}

const deleteDataFaild = (err) => {
    return {
        type: actionType.DELETE_DATA_FAIL,
        err: err
    }
}

export const deleteData = (offerId, uid) => {
    return dispatch => {
        dispatch(deleteDataStart());
        let updates = {};
        updates['/offers/' + offerId] = null;
        updates[`/${uid}/${offerId}`] = null;

        firebase.database().ref().update(updates)
        .then(() => {
            dispatch(fetchUserOffers(uid));
            dispatch(fetchData());
        })
        .catch((err) => dispatch(deleteDataFaild(err)));
    }
}