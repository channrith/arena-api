const axios = require("axios");
const { ENV } = require("../../constants/envConstant");

const listNewsForSitemapAction = async (req, res) => {
  try {
    const { data } = await axios.get(
      `${ENV.POST_SERVICE_URL}/api/v1/news/list-for-sitemap`,
      {
        headers: {
          token: ENV.POST_SERVICE_TOKEN, // <-- Added access header
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
