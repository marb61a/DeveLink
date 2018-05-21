const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Import post model
const Post = require('../../models/Post');

// Import validations
const validatePostInput = require('../../validation/post');

// @route GET /routes/api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Posts file works"}));

// @route GET /routes/api/posts
// @desc Get posts
// @access Public
router.get('/', () => {
  Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => 
      res.status(404).json({nopostsfound: 'There were no posts found'})
    );
});

// @route GET /routes/api/posts:id
// @desc Get post by id
// @access Public
router.get('/:id', () => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
       res.status(404).json({nopostfound: 'There was no post found with that id'})
    );
});

// @route POST /routes/api/posts
// @desc Create post
// @access Private 
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validatePostInput(req.body);

  // Check validation
  if(!isValid){
    // If there are any errors, send a 400 with errors objects
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(res.json(post));
});

module.exports = router;