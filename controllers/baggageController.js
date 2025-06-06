const { Baggage } = require("../models");
const { Passenger } = require("../models");
const { Flight } = require("../models");
const baggage = require("../models/baggage");


const getBaggage = async (req, res) => {
    try {
        const baggage = await Baggage.findAll();
        res.status(200).json(baggage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addBaggage = async (req, res) => {
    try {
        const { passengerFk,flightFk,tagNumber, weight, dimensions, status, checkInLocation, incidentDetails } = req.body;

        const passenger = await Passenger.findByPk(passengerFk);
        if(!passenger)return res.status(404).json({ message: "passengerId not found" });
        const flight = await Flight.findByPk(flightFk);
        if(!flight)return res.status(404).json({ message: "FlightId not found" });

        
        const baggage = await Baggage.create({
            passengerFk,
            flightFk,
            tagNumber, 
            weight, 
            dimensions, 
            status, 
            checkInLocation, 
        
           
            incidentDetails
        });

        return res.status(201).json(baggage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBaggage = async (req, res) => {
    try {
        const { id } = req.params;
        const { passengerFk,flightFk, weight, dimensions, status, currentLocation,incidentDetails } = req.body;

        const baggage = await Baggage.findByPk(id);
        if (!baggage) {
            return res.status(404).json({ message: "Baggage not found" });
        }


        if (passengerFk){
            const passenger = await Passenger.findByPk(passengerFk);
            if(!passenger)return res.status(404).json({ message: "passengerId not found" });
            baggage.passengerId = passengerFk;   
        } 
        
        
        if (flightFk){
            const flight = await Flight.findByPk(flightFk);
            if(!flight)return res.status(404).json({ message: "FlightId not found" });           
            baggage.flightFk = flightFk;
        } 
       
        if (weight) baggage.weight = weight;
        if (dimensions) baggage.dimensions = dimensions;
        if (status) baggage.status = status;
       
        if (currentLocation) baggage.currentLocation = currentLocation;
       
        if (incidentDetails) baggage.incidentDetails = incidentDetails;


        await baggage.save();
        return res.status(200).json({ message: "Baggage updated", baggage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changeBaggageStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const validStatus=["Checked-in","Arrived","Lost","In transit","Delayed"];
        if (!validStatus.includes(status)) {
            return res.status(400).json({ error: `Invalid status. Allowed values: ${validStatus.join(", ")}` });
        }
        

        const baggage = await Baggage.findByPk(id);
        if (!baggage) {
            return res.status(404).json({ error: "Baggage not found" });
        }

        baggage.status = status;
        await baggage.save();

        res.json({ message: `Status updated to ${status}`, baggage });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
const changeBaggageIncidentDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { incidentDetails } = req.body;
        
       
        

        const baggage = await Baggage.findByPk(id);
        if (!baggage) {
            return res.status(404).json({ error: "Baggage not found" });
        }

        if(!incidentDetails){
            return res.status(400).json({ error: "Invalid Incident" });
        }
        baggage.incidentDetails = incidentDetails
        await baggage.save();

        res.json({ message: `incidents updated to ${incidentDetails}`, baggage });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
const deleteBaggage = async (req, res) => {
    try {
        const { id } = req.params;
        const baggage = await Baggage.findByPk(id);
        if (!baggage) {
            return res.status(404).json({ message: "baggage not found" });
        }
        await baggage.destroy();

        return res.status(200).json({ message: "baggage deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = { getBaggage, addBaggage, updateBaggage, changeBaggageStatus,changeBaggageIncidentDetails,deleteBaggage };
