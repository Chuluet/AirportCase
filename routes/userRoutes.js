const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authService =  require("../services/authService");


router.get("/",authService, userController.getUsers);
router.post("/addUser", userController.addUser);
router.post("/:id",authService, userController.updateUser);
router.post("/ChangeState/:id", authService,userController.changeUserStatus);
router.delete("/delete/:id", authService,userController.deleteUser);

module.exports = router;