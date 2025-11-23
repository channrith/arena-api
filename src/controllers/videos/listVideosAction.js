const fs = require("fs");
const path = require("path");
const axios = require("axios");

const configPath = path.join(path.resolve("config/values.json"));

const listVideosAction = async (req, res) => {
  try {
    const { slug } = req.params;
    const { service } = req.query;

    let CONFIG_VALUE = {};
    if (service === "acauto") {
      const rawData = fs.readFileSync(configPath, "utf-8");
      CONFIG_VALUE = JSON.parse(rawData);
    }

    if (!CONFIG_VALUE.POST_SERVICE) {
      return res.status(401).json({ error: "Service code missing" });
    }

    const { BASE_URL, API_KEY } = CONFIG_VALUE.POST_SERVICE;

    const { data } = await axios.get(
      `${BASE_URL}/api/v1/videos?category=${slug}`,
      {
        headers: {
          token: API_KEY,
        },
      }
    );

    const youtubeIds = data.map(item => item.youtube_id);

    res.json(youtubeIds);
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

module.exports = listVideosAction;
