const Trip = require('../models/tripModel');

//get all user trips
module.exports.getTrips = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const trips = await Trip.find({ userId: userId }).sort({ startDate: 1 });
    res.json(trips);
  } catch (err) {
    next(err);
  }
};

//create a trip
module.exports.createTrip = async (req, res, next) => {
  try {
    const trip = await Trip.create(req.body);
    res.json(trip);
  } catch (err) {
    next(err);
  }
};

// update single trip
module.exports.updateTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(trip);
  } catch {
    next(err);
  }
};

//delete a trip
module.exports.deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id, {
      new: true,
    });
    res.json(trip);
  } catch {
    next(err);
  }
};
