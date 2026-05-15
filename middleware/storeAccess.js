const storeAccess = (req, res, next) => {
  // Super_Admin bypass
  if (req.user.role === "Super_Admin") {
    return next();
  }

  // compare store access
  if (
    req.user.store &&
    req.user.store.toString() === req.params.storeId
  ) {
    return next();
  }

  return res.status(403).json({
    message: "Store access denied",
  });
};

module.exports = storeAccess;