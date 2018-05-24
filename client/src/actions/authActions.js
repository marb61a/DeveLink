import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register a user
export const registerUser = (userData) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

