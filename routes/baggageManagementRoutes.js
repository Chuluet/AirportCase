const express = require("express");
const router = express.Router();
const baggageController = require("../controllers/baggageController");
const authService =  require("../services/authService");

router.get("/", authService,baggageController.getBaggage);
router.post("/add",authService, baggageController.addBaggage);
router.post("/update/:id",authService, baggageController.updateBaggage);
router.post("/changeStatus/:id",authService, baggageController.changeBaggageStatus);
router.post("/changeIncidentDetails/:id",authService, baggageController.changeBaggageIncidentDetails);
router.delete("/delete/:id",authService, baggageController.deleteBaggage);

module.exports = router;