import * as actionType from './actionTypes';
import firebase from '../../firebase';
import { fetchUserOffers } from './offers';

const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
}

const authFail = (err) => {
    return {
        type: actionType.AUTH_FAIL,
        err: err
    }
}

const authSuccess = (user) => {
    return {
        type: actionType.AUTH_SUCCESS,
        user: user
    }
}

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => dispatch(authSuccess(user)))
        .catch((err) => dispatch(authFail(err)))
    }
}

export const authRegister = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => dispatch(authSuccess(user)))
        .catch((err) => dispatch(authFail(err)))
    }
}

export const authStateChange = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            dispatch(authSuccess(user))
            dispatch(fetchUserOffers(user.uid))
        })
    }
}

export const authLogout = () => {
    return dispatch => {
        firebase.auth().signOut()
    }
}

export const openModal = () => {
    return {
        type: actionType.OPEN_MODAL,
        modal: true
    }
}

export const closeModal = () => {
    return {
        type: actionType.CLOSE_MODAL,
        modal: false
    }
}