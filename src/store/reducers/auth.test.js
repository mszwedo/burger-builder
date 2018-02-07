import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducers', () => {

   let initialState;

   beforeEach(() => {
      initialState = {
         token: null,
         userId: null,
         error: null,
         loading: false,
         authRedirectPath: '/'
      }
   });

   it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
   });

   it('should store the token upon login', () => {
      const action = {
         type: actionTypes.AUTH_SUCCESS,
         idToken: 'someToken',
         userId: 'someUserId'
      };
      expect(reducer(initialState, action)).toEqual({
         token: 'someToken',
         userId: 'someUserId',
         error: null,
         loading: false,
         authRedirectPath: '/'
      });
   });
});