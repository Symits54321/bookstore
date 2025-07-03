// initialising express router
const express = require("express");
const router = express.Router();
const authController = require("../controller/auth_controller.js");
const bookController = require("../controller/book_controller.js");
const authMiddleware = require("../middleware/auth_middleware.js");

// defining auth endpoints
router.post("/register", authController.register);
router.post("/login", authController.login);

// defining book endpoints
router.post("/books", authMiddleware.verifyAuthenticated , bookController.addBooks);
router.get("/books", authMiddleware.verifyAuthenticated , bookController.getAllBooks);
router.get("/books/:id", authMiddleware.verifyAuthenticated , bookController.getBookById);
router.put("/books/:id", authMiddleware.verifyAuthenticated , bookController.updateBookById);
router.delete("/books/:id", authMiddleware.verifyAuthenticated , bookController.deleteBookById);

module.exports = router;
