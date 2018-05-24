import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register a user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User
export const loginUser = (userData) => dispatch => {
  axios
    .post('api/users/login')
    .then(res => {
      // Save token to local storage
      const { token } = res.json(); 

      // Set token to local stoage
      localStorage.setItem('jwtToken', token);

      // Set token to auth header
      setAuthToken(token);

      // Decode the token to get user data
      const decoded = jwt_decode(token);

      // Set the current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Set the logged in\current user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log a user out
export const logoutUser = () => dispatch => {
  // Remove the token from local storage
  localStorage.removeItem('jwtToken');

  // Remove the auth header for future requests
  setAuthToken(false);

  // Set current user to {} which will set isAuthenticated to false
  dispatch.setCurrentUser({}); 
}