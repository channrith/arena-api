const getCarModelById = require("./getCarModelByIdAction");
const listCarModel = require("./listCarModelAction");
const searchVehicle = require("./searchVehicleAction");
const listCarMaker = require("./listCarMakeAction");
const getCarMakeBySlug = require("./getCarMakeBySlugAction");
const listPoster = require("./listPosterAction");

module.exports = {
  getCarModelById,
  listCarModel,
  searchVehicle,
  listCarMaker,
  getCarMakeBySlug,
  listPoster,
};
