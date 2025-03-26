const express = require("express");
const router = express.Router();
const personnelController = require("../controllers/personnelController");

router.get("/", personnelController.getPersonnel);
router.post("/add", personnelController.addPersonnel);
router.post("/update/:id", personnelController.updatePersonnel);
router.post("/changeStatus/:id", personnelController.changePersonnelStatus);

module.exports = router;