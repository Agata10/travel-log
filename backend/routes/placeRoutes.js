const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

//create a place
router.post('/', placeController.createPlace);

//update a place
router.put('/:id', placeController.updatePlace);

//delete a place
router.delete('/:id', placeController.deletePlace);

//add/delete -toggle favourite places
router.put('/:id/favorites', placeController.toggleFavPlace);

//get favourites
router.get('/favorites/:userId', placeController.getFavPlaces);
module.exports = router;

module.exports = router;
