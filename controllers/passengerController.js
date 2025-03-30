const { Passenger, Flight, FlightDetail } = require("../models");
const getPassengers = async (req, res) => {
    try {
        const passenger = await Passenger.findAll({
            include: [{
                model: FlightDetail, as: "flightDetail", include:
                    [{ model: Flight, as: "flights" }]
            }]
        });
        

        if (!passenger) {
            return res.status(404).json({ error: "No hay pasajeros" })
        }
        res.json(passenger)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

const addPassenger = async (req, res) => {
    try {
        const { name, passportId, email, phone, seatPreference, mealPreference, isActive, flightIds } = req.body;

        const passenger = await Passenger.create({
            name,
            passportId,
            email,
            phone,
            seatPreference,
            mealPreference,
            isActive,
        });

        let flightDetails = [];

        if (flightIds && flightIds.length > 0) {
            for (const flightId of flightIds) {
                const flight = await Flight.findByPk(flightId);
                if (!flight) {
                    return res.status(404).json({ error: `El vuelo con ID ${flightId} no existe` });
                }

                const flightDetail = await FlightDetail.create({
                    passengerFk: passenger.id,
                    flightFk: flight.id,
                });

                flightDetails.push(flightDetail);
            }
        }

        return res.status(201).json({ message: "Pasajero creado", passenger, flightDetails });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message });
    }
};

const updatePassenger = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, passportId, email, phone, seatPreference, mealPreference, isActive, flightIds } = req.body;

        const passenger = await Passenger.findByPk(id);
        if (!passenger) {
            return res.status(404).json({ message: "Pasajero no encontrado" });
        }

        if (name) passenger.name = name;
        if (passportId) passenger.passportId = passportId;
        if (email) passenger.email = email;
        if (phone) passenger.phone = phone;
        if (seatPreference) passenger.seatPreference = seatPreference;
        if (mealPreference) passenger.mealPreference = mealPreference;
        if (isActive !== undefined) passenger.isActive = isActive;

        await passenger.save();

        if (flightIds && flightIds.length > 0) {
            for (const flightId of flightIds) {
                await FlightDetail.findOrCreate({
                    where: { passengerFk: passenger.id, flightFk: flightId },
                    defaults: { passengerFk: passenger.id, flightFk: flightId }
                });
            }
        }        

        return res.status(200).json({ message: "Pasajero actualizado", passenger });
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
const deletePassenger = async (req, res) => {
    try {
        const { id } = req.params;
        const passenger = await Passenger.findByPk(id);
        if (!passenger) {
            return res.status(404).json({ message: "Pasajero no encontrado" });
        }
        await passenger.destroy();

        return res.status(200).json({ message: "Pasajero eliminado correctamente" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = { getPassengers, addPassenger, updatePassenger, changePassengerStatus, deletePassenger };
