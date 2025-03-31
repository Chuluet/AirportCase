const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");
const authService =  require("../services/authService");




router.get("/",authService, flightController.getFlights);
router.post("/addFlight",authService, flightController.addFlight);
router.post("/updateFlight/:id",authService,flightController.updateFlight);
router.post("/ChangeFlightStatus/:id",authService, flightController.changeFlightStatus);

module.exports = router;