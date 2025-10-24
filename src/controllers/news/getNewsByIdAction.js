const axios = require("axios");
const { ENV } = require("../../constants/envConstant");
const { transformPost } = require("../../utils/newsUtil");

const getNewsByIdAction = async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await axios.get(
      `${ENV.POST_SERVICE_URL}/api/v1/posts/${id}`,
      {
        headers: {
          token: ENV.POST_SERVICE_TOKEN,
        },
      }
    );

    const transformed = transformPost(data);
    res.json(transformed);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

module.exports = getNewsByIdAction;
