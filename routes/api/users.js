const express = require('express');
const router = express.Router();

// @route GET /routes/api/users/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Users file works"}));

module.exports = router;