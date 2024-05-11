const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', (req, res, next) => {
  res.json({ login: 'logged in' });
});

module.exports = router;
