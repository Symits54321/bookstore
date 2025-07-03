// initialising express router
const express = require("express");
const router = express.Router();
const authController = require("../controller/auth_controller.js")

// defining auth endpoints
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
