const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Import User model
const User = require('../../models/User');

// @route GET /routes/api/users/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Users file works"}));

// @route POST /routes/api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  // Check to see if email exists when registering
  User.findOne({email: req.body.email})
    .then(user => {
      if(user){
        return res.status(400).json({email: 'Email already exists'});
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',     // Image size
          r: 'pg',      // Image rating
          d: 'mm'       // Default image if none exists
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        // Generate a salt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err){
              throw err;
            }  
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});

// @route POST /routes/api/users/login
// @desc Login User / Returning JWT 
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find a user by their email
  User.findOne({email})
    .then(user => {
      // Check for user
      if(!user){
        return res.status(404).json({email: 'User not found'});
      }

      // Check the password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch){
            // User matched
            
            // Create user payload
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            };

            // Sign JWT Token
            jwt.sign(
              payload, 
              keys.secretOrKey, 
              { expiresIn: 3600 }, 
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );

          } else {
            return res.status(400).json({password: 'Incorrect Password'});
          }
        });
    });
});

// @route POST /routes/api/users/current
// @desc Return current user
// @access Private
router.get('/current', passport.authenticate(jwt, {session: false}), () => {
  
});

module.exports = router;