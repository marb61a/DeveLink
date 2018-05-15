const express = require('express');
const router = express.Router();

// @route GET /routes/api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Posts file works"}));

module.exports = router;