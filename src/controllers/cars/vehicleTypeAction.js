const fs = require("fs");
const path = require("path");
const axios = require("axios");

const configPath = path.join(path.resolve("config/values.json"));

const vehicleTypeAction = async (req, res) => {
  try {
    const { maker, global, service } = req.query;
    const page = req.query.page || 1;

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
      `${BASE_URL}/api/v1/vehicle-types?is_global_model=${global || 0}&maker=${maker}&include=series&page=${page}`,
      {
        headers: {
          token: API_KEY,
        },
      },
    );

    res.json({
      current_page: data.meta.current_page,
      total: data.meta.total,
      per_page: data.meta.per_page,
      data: data.data,
    });
  } catch (error) {
    console.error("Error fetching cars:", error.message);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

module.exports = vehicleTypeAction;
