const axios = require("axios");
const { ENV } = require("../../constants/envConstant");
const { transformPosts } = require("../../utils/newsUtil");

const getAvailableNews = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const { data } = await axios.get(
      `${ENV.POST_SERVICE_URL}/api/v1/posts?page=${page}`,
      {
        headers: {
          token: ENV.POST_SERVICE_TOKEN, // <-- Added access header
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
