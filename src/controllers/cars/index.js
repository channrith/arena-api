const getCarModelById = require("./getCarModelByIdAction");
const listCarModel = require("./listCarModelAction");
const listCarModelBySeries = require("./listCarModelBySeriesAction");
const searchVehicle = require("./searchVehicleAction");
const listCarMaker = require("./listCarMakeAction");
const getCarMakeBySlug = require("./getCarMakeBySlugAction");
const listPoster = require("./listPosterAction");
const vehicleType = require("./vehicleTypeAction");

module.exports = {
  getCarModelById,
  listCarModel,
  listCarModelBySeries,
  searchVehicle,
  listCarMaker,
  getCarMakeBySlug,
  listPoster,
  vehicleType,
};
