const Place = require('../models/placeModel');
const Trip = require('../models/tripModel');

//create place
module.exports.createPlace = async (req, res, next) => {
  try {
    const place = await Place.create(req.body);
    await Trip.findByIdAndUpdate(req.body.tripId, {
      $push: { places: place._id },
    });
    res.json(place);
  } catch (err) {
    next(err);
  }
};

//update place
module.exports.updatePlace = async (req, res, next) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(place);
  } catch (err) {
    next(err);
  }
};

//delete place
module.exports.deletePlace = async (req, res, next) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    await Trip.findByIdAndUpdate(req.body.tripId, {
      $pull: { places: place._id },
    });
    res.json(place);
  } catch (err) {
    next(err);
  }
};

//add/delete -toggle favourite places
module.exports.toggleFavPlace = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    place.favorite = !place.favorite;
    await place.save();
    res.json(place);
  } catch (err) {
    next(err);
  }
};

//get favourites places
module.exports.getFavPlaces = async (req, res, next) => {
  try {
    const places = await Place.find({ favorite: true });
    res.json(places);
  } catch (err) {
    next(err);
  }
};

module.exports.getPlacesByDate = async (req, res, next) => {
  try {
    const places = await Place.find({ date: req.params.date });
    res.json(places);
  } catch (err) {
    next(err);
  }
};
