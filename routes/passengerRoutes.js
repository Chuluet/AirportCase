const express = require("express");
const router = express.Router();
const passengerController = require("../controllers/passengerController");
const authService =  require("../services/authService");

router.get("/",authService, passengerController.getPassengers);
router.get("/:id",authService, passengerController.getPassengerById);
router.post("/add",authService, passengerController.addPassenger);
router.post("/update/:id",authService, passengerController.updatePassenger);
router.post("/changerStatus/:id",authService, passengerController.changePassengerStatus);
router.delete('/delete/:id',authService, passengerController.deletePassenger);


module.exports = router;