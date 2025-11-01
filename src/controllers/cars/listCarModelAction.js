const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { transformVehicles } = require("../../utils/vehicleUtil");

const configPath = path.join(path.resolve("config/values.json"));

const listCarModelAction = async (req, res) => {
  try {
    const { global, maker, service } = req.query;

    if (!maker) {
      return res.status(401).json({ error: "Maker missing" });
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
      `${BASE_URL}/api/v1/maker/${maker}/car-models?is_global_model=${global || 0}`,
      {
        headers: {
          token: API_KEY,
        },
      }
    );

    const transformed = transformVehicles(data);
    res.json({
      current_page: data.current_page,
      total: data.total,
      per_page: data.per_page,
      vehicles: transformed,
    });
  } catch (error) {
    console.error("Error fetching cars:", error.message);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

module.exports = listCarModelAction;
