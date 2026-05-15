const Store = require("../models/Store");

// Create Store
const createStore = async (req, res) => {
  try {
    const store = await Store.create(req.body);

    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Stores
const getStores = async (req, res) => {
  try {
    const stores = await Store.find();

    res.json(stores);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Store
const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.storeId);

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Store
const updateStore = async (req, res) => {
  try {
    const store = await Store.findByIdAndUpdate(
      req.params.storeId,
      req.body,
      { new: true }
    );

    res.json(store);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Store
const deleteStore = async (req, res) => {
  try {
    await Store.findByIdAndDelete(req.params.storeId);

    res.json({
      message: "Store deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
};