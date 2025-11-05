const fs = require("fs");
const path = require("path");
const axios = require("axios");

const configPath = path.join(path.resolve("config/values.json"));

const listNewsForSitemapAction = async (req, res) => {
  const rawData = fs.readFileSync(configPath, "utf-8");
  const CONFIG_VALUE = JSON.parse(rawData);

  if (!CONFIG_VALUE.POST_SERVICE) {
    return res.status(500).json({ error: "Missing configuration" });
  }

  const { BASE_URL, API_KEY } = CONFIG_VALUE.POST_SERVICE;

  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/news/list-for-sitemap`,
      {
        headers: {
          token: API_KEY,
        },
      }
    );

    res.json(data);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

module.exports = listNewsForSitemapAction;
