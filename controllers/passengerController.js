const { Passenger } = require("../models");

const getPassengers = async (req, res) => {
    try {
        const passengers = await Passenger.findAll();
        res.status(200).json(passengers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addPassenger = async (req, res) => {
    try {
        const { name, passportId, email, phone, seatPreference, mealPreference, specialAssistance, isActive } = req.body;
        
        const passenger = await Passenger.create({
            name,
            passportId,
            email,
            phone,
            seatPreference,
            mealPreference,
            specialAssistance,
            isActive
        });

        return res.status(201).json(passenger);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePassenger = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, passportId, email, phone, seatPreference, mealPreference, specialAssistance, isActive } = req.body;

        const passenger = await Passenger.findByPk(id);
        if (!passenger) {
            return res.status(404).json({ message: "Passenger not found" });
        }

        if (name) passenger.name = name;
        if (passportId) passenger.passportId = passportId;
        if (email) passenger.email = email;
        if (phone) passenger.phone = phone;
        if (seatPreference) passenger.seatPreference = seatPreference;
        if (mealPreference) passenger.mealPreference = mealPreference;
        if (specialAssistance !== undefined) passenger.specialAssistance = specialAssistance;
        if (isActive !== undefined) passenger.isActive = isActive;

        await passenger.save();
        return res.status(200).json({ message: "Passenger updated", passenger });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changePassengerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        if (typeof isActive !== 'boolean') {
            return res.status(400).json({ error: "Invalid status value. Use true or false." });
        }

        const passenger = await Passenger.findByPk(id);
        if (!passenger) {
            return res.status(404).json({ error: "Passenger not found" });
        }

        passenger.isActive = isActive;
        await passenger.save();

        res.json({ message: `Status updated to ${isActive}`, passenger });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getPassengers, addPassenger, updatePassenger, changePassengerStatus };
