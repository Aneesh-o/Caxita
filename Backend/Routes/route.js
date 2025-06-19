const express = require('express');
const router = express.Router();
const flightController = require('../Controller/flightController');

router.post('/addFlight', flightController.createFlight);
router.get('/getDetails', flightController.getFlights);

module.exports = router;
