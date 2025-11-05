const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { transformPosts } = require("../../utils/newsUtil");

const configPath = path.join(path.resolve("config/values.json"));

const getAvailableNews = async (req, res) => {
  const rawData = fs.readFileSync(configPath, "utf-8");
  const CONFIG_VALUE = JSON.parse(rawData);

  if (!CONFIG_VALUE.POST_SERVICE) {
    return res.status(500).json({ error: "Missing configuration" });
  }

  const { BASE_URL, API_KEY } = CONFIG_VALUE.POST_SERVICE;

  try {
    const page = req.query.page || 1;
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/posts?page=${page}`,
      {
        headers: {
          token: API_KEY,
        },
      }
    );

    const transformed = transformPosts(data);
    res.json({
      current_page: data.current_page,
      total: data.total,
      per_page: data.per_page,
      posts: transformed,
    });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

module.exports = getAvailableNews;
