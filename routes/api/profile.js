const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load the profile model
const Profile = require('../../models/Profile');

// Load user model
const User = require('../../models/User');

// @route GET /routes/api/profile/test
// @desc Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profile file works"}));

// @route GET /routes/api/profile
// @desc Gets the current users profile 
// @access Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};

  Profile.findOne({user: req.user.id})
    .then(profile => {
      if(!profile){
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route POST /routes/api/profile
// @desc Create user profile 
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  // Get the profile fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if(req.body.handle) profileFields.handle = req.body.handle;
  if(req.body.company) profileFields.company = req.body.company;
  if(req.body.website) profileFields.website = req.body.website;
  if(req.body.location) profileFields.location = req.body.location;

});

module.exports = router;