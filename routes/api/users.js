const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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
  User.findOne({

  });
});

module.exports = router;