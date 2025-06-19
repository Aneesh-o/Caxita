const Flight = require('../Model/flightModel');

// Add a new flight
exports.createFlight = async (req, res) => {
    try {
        const flight = new Flight(req.body);
        await flight.save();
        res.status(201).json(flight);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all flights with filters and sorting
exports.getFlights = async (req, res) => {
    try {
        const { minPrice, maxPrice, airline, sortBy, order } = req.query;
        const filter = {};
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        if (airline) {
            filter.airline = { $regex: airline, $options: 'i' };
        }
        let sort = {};
        if (sortBy) {
            sort[sortBy] = order === 'desc' ? -1 : 1;
        }
        const flights = await Flight.find(filter).sort(sort);
        res.json(flights);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
