const express = require("express");
const router = express.Router();
const airportServicesController = require("../controllers/airportServicesController");

router.get("/", airportServicesController.getAirportServices);
router.post("/add", airportServicesController.addAirportServices);
router.post("/update/:id", airportServicesController.updateAirportServices);
router.post("/changeStatus/:id", airportServicesController.changeAirportServicesStatus);

module.exports = router;