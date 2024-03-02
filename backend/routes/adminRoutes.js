const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
//const { storage } = require("../cloudinary");
//const upload = multer({ storage });

// Adviser Routes
router
  .route("/advisers")
  .get(isLoggedIn, isAdmin, adminController.viewAdvisers)
  .post(isLoggedIn, isAdmin, adminController.createAdviser);

router
  .route("/advisers/:id")
  .get(isLoggedIn, isAdmin, adminController.viewAdviser)
  .put(isLoggedIn, isAdmin, adminController.editAdviser)
  .delete(isLoggedIn, isAdmin, adminController.deleteAdviser);

// Product Routes
router
  .route("/products")
  .get(adminController.viewProducts)
  .post(isLoggedIn, isAdmin, upload.single("image"), adminController.createProduct);

router
  .route("/products/:id")
  .get(isLoggedIn, isAdmin, adminController.viewProduct)
  .put(isLoggedIn, isAdmin, upload.single("image"), adminController.editProduct)
  .delete(isLoggedIn, isAdmin, adminController.deleteProduct);

// Order Routes
router
  .route("/orders")
  .get(isLoggedIn, adminController.viewOrders)
  .post(adminController.createOrder);

router
  .route("/orders/:id")
  .get(isLoggedIn, adminController.viewOrder)
  .put(isLoggedIn, adminController.editOrder)
  .delete(isLoggedIn, isAdmin, adminController.deleteOrder);

module.exports = router;
