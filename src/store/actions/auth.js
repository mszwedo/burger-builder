import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
   return {
      type: actionTypes.AUTH_START
   };
};

export const authSuccess = (authData) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      authData: authData
   };
};

export const authFail = (error) => {
   return {
      type: actionTypes.AUTH_FAIL,
      error: error
   };
};

export const auth = (email, password) => {
   return dispatch => {
      dispatch(authStart());
      const authData = {
         email: email,
         password: password,
         returnSecureToken: true
      };
      const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.REACT_APP_FIREBASE_API_KEY;
      axios.post(url, authData)
         .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
         })
         .catch(err => {
            console.log(err);
            dispatch(authFail(err))
         });
   };
};