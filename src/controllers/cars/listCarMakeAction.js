const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { transformVehicleMakers } = require("../../utils/vehicleUtil");

const configPath = path.join(path.resolve("config/values.json"));

const listCarMakeAction = async (req, res) => {
  try {
    const { limit, service } = req.query;

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
      `${BASE_URL}/api/v1/vehicle-makers?limit=${limit}`,
      {
        headers: {
          token: API_KEY,
        },
      }
    );

    const transformed = transformVehicleMakers(data);
    res.json({
      total: data.total,
      makers: transformed,
    });
  } catch (error) {
    console.error("Error fetching cars:", error.message);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

module.exports = listCarMakeAction;
