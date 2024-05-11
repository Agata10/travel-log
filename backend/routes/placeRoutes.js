const express = require('express');
const router = express.Router();
const Place = require('../models/placeModel');
const Trip = require('../models/tripModel');

//create a place
router.post('/', async (req, res, next) => {
  try {
    const place = await Place.create(req.body);
    //delete it later
    await Trip.findByIdAndUpdate(req.body.tripId, {
      $push: { places: place._id },
    });
    res.json(place);
  } catch (err) {
    next(err);
  }
});

//update a place
router.put('/:id', async (req, res, next) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(place);
  } catch (err) {
    next(err);
  }
});

//delete a place
router.delete('/:id', async (req, res, next) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    //delete it later
    await Trip.findByIdAndUpdate(req.body.tripId, {
      $pull: { places: place._id },
    });
    res.json(place);
  } catch (err) {
    next(err);
  }
});

//add/delete -toggle favourite places
router.put('/:id/favourite', async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    place.favourite = !place.favourite;
    await place.save();
    res.json(place);
  } catch (err) {
    next(err);
  }
});

//get favourites
router.get('/favourites', async (req, res, next) => {
  try {
    const places = await Place.find({ favourite: true });
    res.json(places);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
