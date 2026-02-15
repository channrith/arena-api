const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { transformVehicleModels } = require("../../utils/vehicleUtil");

const configPath = path.join(path.resolve("config/values.json"));

const listCarModelBySeriesAction = async (req, res) => {
  try {
    const { global, series_slug, service } = req.query;
    const page = req.query.page || 1;

    if (!series_slug) {
      return res.status(401).json({ error: "Series missing" });
    }
  

    let CONFIG_VALUE = {};
    if (service === "acauto") {
      const rawData = fs.readFileSync(configPath, "utf-8");
      CONFIG_VALUE = JSON.parse(rawData);
    }

    if (!CONFIG_VALUE.ACAUTO_SERVICE) {
      return res.status(401).json({ error: "Service code missing" });
    }

    const { BASE_URL, API_KEY } = CONFIG_VALUE.ACAUTO_SERVICE;

    const { data } = await axios.get(
      `${BASE_URL}/api/v1/series/${series_slug}/car-models?is_global_model=${global || 0}&page=${page}`,
      {
        headers: {
          token: API_KEY,
        },
      }
    );

    const transformed = transformVehicleModels(data);
    res.json({
      current_page: data.pagination.current_page,
      total: data.pagination.total_years,
      per_page: data.pagination.per_page,
      vehicles: transformed,
    });
  } catch (error) {
    console.error("Error fetching cars:", error.message);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

module.exports = listCarModelBySeriesAction;
