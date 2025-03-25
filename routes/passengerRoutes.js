const express = require("express");
const router = express.Router();
const passengerController = require("../controllers/pessengerController");

router.get("/", passengerController.getpassenger);
router.post("/add", passengerController.addpassenger);
router.post("/update/:id", passengerController.updatepassenger);
router.post("/changeStatus/:id", passengerController.changepassengerStatus);

module.exports = router;