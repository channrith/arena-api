const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { transformPost } = require("../../utils/newsUtil");

const configPath = path.join(path.resolve("config/values.json"));

const getNewsByIdAction = async (req, res) => {
  try {
    const { id } = req.params;

    const rawData = fs.readFileSync(configPath, "utf-8");
    const CONFIG_VALUE = JSON.parse(rawData);

    if (!CONFIG_VALUE.POST_SERVICE) {
      return res.status(500).json({ error: "Missing configuration" });
    }

    const { BASE_URL, API_KEY } = CONFIG_VALUE.POST_SERVICE;

    const { data } = await axios.get(`${BASE_URL}/api/v1/posts/${id}`, {
      headers: {
        token: API_KEY,
      },
    });

    const transformed = transformPost(data);
    res.json(transformed);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

module.exports = getNewsByIdAction;
