const express = require('express');
const router = express.Router();
const Trip = require('../models/tripModel');

//get all user trips
router.get('/userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const trips = await Trip.findById(userId);
    res.json(trips);
  } catch (err) {
    next(err);
  }
});

//add trip
router.post('/', async (req, res, next) => {
  try {
    const trip = await Trip.create(req.body);
    res.json(trip);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
