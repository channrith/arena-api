const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { ENV } = require("./constant/envConstant");

const app = express();
app.use(cors());

// Transform helper
const transformPosts = (apiResponse) => {
  const posts = apiResponse.data.map((item) => {
    const t = item.current_translation;
    const baseSlug = t?.slug || `post-${item.id}`;
    return {
      id: item.id,
      published_at: item.published_at,
      title: t?.title || "Untitled",
      slug: `${baseSlug}-${item.id}`,
      link: `/news/${baseSlug}-${item.id}`,
      excerpt: t?.summary || "",
      featured_image: {
        url: t?.feature_image || "",
        alt: t?.title || "",
        thumbnail: t?.thumbnail_image || t?.feature_image || "",
      },
      source: item.source,
      author: {
        id: item.author?.id,
        name: item.author?.name,
      },
      translator: {
        name: t?.translator_name || "",
      },
    };
  });

  return posts;
};

// Gateway route
app.get("/api/news", async (req, res) => {
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
});

app.listen(ENV.APP_PORT, () => {
  console.log(`Server running on port ${ENV.APP_PORT}`);
});
