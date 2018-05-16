const express = require('express');
const router = express.Router();
const gravatar = require('gravater');

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
        const avatar = gravatar.url();

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });
      }
    });
});

module.exports = router;