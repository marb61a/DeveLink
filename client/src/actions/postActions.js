import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST } from './types';

// Add a post
export const addPost = postData => dispatch => {
  axios 
    .post('/api/posts', postData)
    .then(res => 
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Get posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());

  axios 
    .get('/api/posts')
    .then(res => 
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    )
}

// Get post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());

  axios 
    .get(`/api/posts/${id}`)
    .then(res => 
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_POST,
        payload: null
      })
    )
}

// Delete Posts
export const deletePost = id => dispatch => {
  axios 
    .post(`/api/posts/${id}`)
    .then(res => 
      dispatch({
        type: DELETE_POST,
        payload: res.id
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Add Likes
export const addLike = id => dispatch => {
  axios 
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Remove Like
export const removeLike = id => dispatch => {
  axios 
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Add a comment
export const addComment = (postId, commentData) => dispatch => {
  axios 
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => 
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Set the loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}