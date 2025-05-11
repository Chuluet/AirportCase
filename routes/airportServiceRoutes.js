const express = require("express");
const router = express.Router();
const airportServicesController = require("../controllers/airportServicesController");
const authService =  require("../services/authService");

router.get("/",authService, airportServicesController.getAirportServices);
router.get("/:id",authService, airportServicesController.getAirportServiceById);
router.post("/add",authService, airportServicesController.addAirportServices);
router.post("/update/:id", authService,airportServicesController.updateAirportServices);
router.post("/changeStatus/:id",authService, airportServicesController.changeAirportServicesStatus);
router.delete("/delete/:id",authService, airportServicesController.deleteAiportServices);

module.exports = router;