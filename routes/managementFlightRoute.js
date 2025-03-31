const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");
const authService =  require("../services/authService");




router.get("/",authService, flightController.getFlights);
router.post("/addFlight",authService, flightController.addFlight);
router.post("/update/:id",authService,flightController.updateFlight);
router.post("/ChangeFlightStatus/:id",authService, flightController.changeFlightStatus);
router.post("/delete/:id",authService, flightController.deleteflight);

module.exports = router;