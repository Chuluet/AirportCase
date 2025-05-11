const express = require("express");
const router = express.Router();
const personnelController = require("../controllers/personnelController");
const authService =  require("../services/authService");

router.get("/", authService,personnelController.getPersonnel);
router.get("/:id", authService,personnelController.getPersonnelById);
router.post("/add", authService, personnelController.addPersonnel);
router.post("/update/:id",authService, personnelController.updatePersonnel);
router.post("/changeStatus/:id",authService, personnelController.changePersonnelStatus);
router.delete("/delete/:id",authService, personnelController.deletePersonnel);

module.exports = router;