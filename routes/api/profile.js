const express = require('express');
const router = express.Router();

// @route GET /routes/api/profile/test
// @desc Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profile file works"}));

module.exports = router;