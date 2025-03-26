const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");



router.get("/", flightController.getFlights);
router.post("/addFlight", flightController.addFlight);
router.post("/updateFlight/:id",flightController.updateFlight);
router.post("/ChangeFlightStatus/:id", flightController.changeFlightStatus);

module.exports = router;