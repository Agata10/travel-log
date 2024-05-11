const express = require('express');
const router = express.Router();

router.post('/signup', (req, res, next) => {
  res.json({ signin: 'signed in' });
});
router.post('/login', (req, res, next) => {
  res.json({ login: 'logged in' });
});

module.exports = router;
