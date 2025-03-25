const express = require("express");
const router = express.Router();
const baggageController = require("../controllers/baggageController");

router.get("/", baggageController.getBaggage);
router.post("/add", baggageController.addBaggage);
router.post("/update/:id", baggageController.updateBaggage);
router.post("/changeStatus/:id", baggageController.changeBaggageStatus);
router.post("/changeIncidentDetails/:id", baggageController.changeBaggageIncidentDetails);

module.exports = router;