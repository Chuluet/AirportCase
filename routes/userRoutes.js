const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authService =  require("../services/authService");


router.get("/",authService, userController.getUsers);
router.post("/addUser",authService, userController.addUser);
router.post("/:id",authService, userController.updateUser);
router.post("/ChangeStatus/:id", authService,userController.changeUserStatus);
router.post("/delete/:id", authService,userController.deleteUser);

module.exports = router;