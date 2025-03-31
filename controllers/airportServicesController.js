const { AirportServices } = require("../models");

const getAirportServices = async (req, res) => {
    try {
        const airportServices = await AirportServices.findAll();
        res.status(200).json(airportServices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addAirportServices = async (req, res) => {
    try {
        const { name, type, description, location, isActive } = req.body;
        
        const airportServices = await AirportServices.create({
            name,
            type,
            description,
            location,
            isActive
        });

        return res.status(201).json(airportServices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAirportServices = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, description, location, isActive } = req.body;

        const airportServices = await AirportServices.findByPk(id);
        if (!airportServices) {
            return res.status(404).json({ message: "AirportServices not found" });
        }

        if (name) airportServices.name = name;
        if (type) airportServices.type = type;
        if (description) airportServices.description = description;
        if (location) airportServices.location = location;
        if (isActive) airportServices.isActive = isActive;

        await airportServices.save();
        return res.status(200).json({ message: "AirportServices updated", airportServices });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changeAirportServicesStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        if (typeof isActive !== 'boolean') {
            return res.status(400).json({ error: "Invalid status value. Use true or false." });
        }

        const airportServices = await AirportServices.findByPk(id);
        if (!airportServices) {
            return res.status(404).json({ error: "AirportServices not found" });
        }

        airportServices.isActive = isActive;
        await airportServices.save();

        res.json({ message: `Status updated to ${isActive}`, airportServices });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
const deleteAiportServices = async (req, res) => {
    try {
        const { id } = req.params;
        const airportServices = await AirportServices.findByPk(id);
        if (!airportServices) {
            return res.status(404).json({ message: "AirportServices not found" });
        }
        await airportServices.destroy();

        return res.status(200).json({ message: "AirportServices deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { getAirportServices, addAirportServices, updateAirportServices, changeAirportServicesStatus,deleteAiportServices };
