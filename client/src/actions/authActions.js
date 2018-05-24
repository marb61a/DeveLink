import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register a user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
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
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}