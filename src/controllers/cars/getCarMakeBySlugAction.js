const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { transformVehicleMakers } = require("../../utils/vehicleUtil");

const configPath = path.join(path.resolve("config/values.json"));

const getCarMakeBySlugAction = async (req, res) => {
  try {
    const { slug } = req.params;
    const { service } = req.query;

    let CONFIG_VALUE = {};
    if (service === "acauto") {
      const rawData = fs.readFileSync(configPath, "utf-8");
      CONFIG_VALUE = JSON.parse(rawData);
    }

    if (!CONFIG_VALUE.ACAUTO_SERVICE) {
      return res.status(401).json({ error: "Service code missing" });
    }

    const { BASE_URL, API_KEY } = CONFIG_VALUE.ACAUTO_SERVICE;

    const apiResponse = await axios.get(
      `${BASE_URL}/api/v1/vehicle-makers/${slug}`,
      {
        headers: {
          token: API_KEY,
        },
      }
    );

    const { data } = apiResponse;

    res.json({
      image_url: data.banner_image_url,
      description: data.description,
    });
  } catch (error) {
    console.error("Error fetching maker:", error.message);
    res.status(500).json({ error: "Failed to fetch maker" });
  }
};

module.exports = getCarMakeBySlugAction;
