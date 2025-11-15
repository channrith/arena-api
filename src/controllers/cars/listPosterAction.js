const fs = require("fs");
const path = require("path");
const axios = require("axios");

const configPath = path.join(path.resolve("config/values.json"));

const listPosterAction = async (req, res) => {
  try {
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

    const { data } = await axios.get(
      `${BASE_URL}/api/v1/posters`,
      {
        headers: {
          token: API_KEY,
        },
      }
    );

    res.json(data);
  } catch (error) {
    console.error("Error fetching posters:", error.message);
    res.status(500).json({ error: "Failed to fetch posters" });
  }
};

module.exports = listPosterAction;
