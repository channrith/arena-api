const express = require("express");
const {
  getCarModelById,
  listCarModel,
  searchVehicle,
} = require("../controllers/cars");
// const accessMiddleware = require("../middlewares/accessMiddleware");

const router = express.Router();

router.get("/search", searchVehicle);
router.get("/model", listCarModel);
router.get("/model/:id", getCarModelById);

module.exports = router;
