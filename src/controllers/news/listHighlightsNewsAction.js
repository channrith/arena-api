const axios = require("axios");
const { ENV } = require("../../constants/envConstant");
const { transformPosts } = require("../../utils/newsUtil");

const listHighlightsNewsAction = async (req, res) => {
  try {
    const apiResponse = await axios.get(
      `${ENV.POST_SERVICE_URL}/api/v1/highlights`,
      {
        headers: {
          token: ENV.POST_SERVICE_TOKEN, // <-- Added access header
        },
      }
    );

    const transformed = transformPosts(apiResponse);
    res.json(transformed);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

module.exports = listHighlightsNewsAction;
