const express = require("express");
const router = express.Router();
const passengerController = require("../controllers/passengerController");

router.get("/", passengerController.getPassengers);
router.post("/addPassenger", passengerController.addPassenger);
router.post("/updatePassenger/:id", passengerController.updatePassenger);
router.post("/changePassengerStatus/:id", passengerController.changePassengerStatus);
router.delete('/deletePassenger/:id', passengerController.deletePassenger);


module.exports = router;