const express = require("express");
const router = express.Router();

const passport = require("passport");

const authorize = require("../middleware/authorize");

const {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
} = require("../controllers/storeController");

// Create Store
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize("Super_Admin"),
  createStore
);

// Get all stores
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getStores
);

// Get single store
router.get(
  "/:storeId",
  passport.authenticate("jwt", { session: false }),
  getStoreById
);

// Update store
router.put(
  "/:storeId",
  passport.authenticate("jwt", { session: false }),
  authorize("Super_Admin", "Merchandiser"),
  updateStore
);

// Delete store
router.delete(
  "/:storeId",
  passport.authenticate("jwt", { session: false }),
  authorize("Super_Admin"),
  deleteStore
);

module.exports = router;