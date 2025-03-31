const bcrypt = require("bcryptjs");
const { Flight } = require("../models");

const getFlights = async (req, res) => {
    try {
        const flights = await Flight.findAll();
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const addFlight = async (req, res) => {
    try {
        const {
            flightNumber,
            airline,
            departureAirport,
            arrivalAirport,
            departureTime,
            arrivalTime,
            route,
            status,
            boardingGate,
            aircraftType,
            baggageClaim
        } = req.body;

        const flight = await Flight.create({
            flightNumber,
            airline,
            departureAirport,
            arrivalAirport,
            departureTime,
            arrivalTime,
            route,
            status,
            boardingGate,
            aircraftType,
            baggageClaim
        });

        return res.status(201).json(flight);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateFlight = async (req, res) => {
    try {
        const { id } = req.params;
        const { departureTime, arrivalTime, status, boardingGate, baggageClaim } = req.body;

        const flight = await Flight.findByPk(id);
        if (!flight) {
            return res.status(404).json({ message: "flight not found" });
        }

        if (departureTime) flight.departureTime = departureTime;
        if (arrivalTime) flight.arrivalTime = arrivalTime;
        if (status) flight.status = status;
        if (boardingGate) flight.boardingGate = boardingGate;
        if (baggageClaim) flight.baggageClaim = baggageClaim;

        await flight.save();
        return res.status(200).json({ message: "flight found", flight });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const changeFlightStatus = async (req, res) => {
    try {
        const { id } = req.params; 
        const { status } = req.body;

      
        const validStatuses = ["Scheduled", "In Progress", "Delayed", "Canceled"];

     
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: `Invalid status. Use one of the following: ${validStatuses.join(", ")}` });
        }

      
        const flight = await Flight.findByPk(id);
        if (!flight) {
            return res.status(404).json({ error: "Flight not found" });
        }

     
        flight.status = status;
        await flight.save();

        return res.status(200).json({ message: "flight status was updated", flight });
    } catch (error) {
       
        res.status(500).json({ error: "Internal server error" });
    }
};
const deleteflight = async (req, res) => {
    try {
        const { id } = req.params;
        const flight = await Flight.findByPk(id);
        if (!flight) {
            return res.status(404).json({ message: "flight not found" });
        }
        await flight.destroy();

        return res.status(200).json({ message: "flight deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { getFlights, addFlight, updateFlight, changeFlightStatus,deleteflight }