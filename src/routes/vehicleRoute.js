const express = require("express");
const {
  getCarModelById,
  listCarModel,
  listCarModelBySeries,
  searchVehicle,
  listCarMaker,
  getCarMakeBySlug,
  vehicleType,
} = require("../controllers/cars");
// const accessMiddleware = require("../middlewares/accessMiddleware");

const router = express.Router();

router.get("/search", searchVehicle);
router.get("/types", vehicleType);
router.get("/makers", listCarMaker);
router.get("/makers/:slug", getCarMakeBySlug);
router.get("/models", listCarModelBySeries);
router.get("/model", listCarModel);
router.get("/model/:id", getCarModelById);

module.exports = router;
