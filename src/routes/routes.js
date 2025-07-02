// initialising express router
const express = require("express");
const router = express.Router();
const authController = require("../controller/auth_controller.js")

router.post("/register", authController.register);

module.exports = router;
