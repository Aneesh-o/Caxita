const express = require('express');
const router = express.Router();
const FlightConroller = require('../Controller/flightController')

router.post('/addFlight', FlightConroller.createFlight);
router.get('/getDetails', FlightConroller.getFlights);

module.exports = router;


