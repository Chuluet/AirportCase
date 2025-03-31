const express = require("express");
const router = express.Router();
const passengerController = require("../controllers/passengerController");
const authService =  require("../services/authService");

router.get("/",authService, passengerController.getPassengers);
router.post("/addPassenger",authService, passengerController.addPassenger);
router.post("/updatePassenger/:id",authService, passengerController.updatePassenger);
router.post("/changePassengerStatus/:id",authService, passengerController.changePassengerStatus);
router.delete('/deletePassenger/:id',authService, passengerController.deletePassenger);


module.exports = router;