const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

//get all user trips
router.get('/:userId', tripController.getTrips);

//get single trip
router.get('/trip/:tripId', tripController.getSingleTrip);

//create a trip
router.post('/', tripController.createTrip);

// update single trip
router.put('/:id', tripController.updateTrip);

// delete a single trip
router.delete('/:id', tripController.deleteTrip);

//get all expanses
router.get('/:id/expenses', tripController.getExpenses);

//get all places
router.get('/:id/places', tripController.getPlaces);

//get places for given day
router.get('/:id/places/:date', tripController.getPlacesByDate);

module.exports = router;
