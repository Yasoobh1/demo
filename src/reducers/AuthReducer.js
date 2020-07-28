import * as actionTypes from '../actions/types';
import { combineReducers } from 'redux';

const initialUserState = {
    currentUser: null,
    isLoading: true
};

export default (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return { 
                currentUser: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}