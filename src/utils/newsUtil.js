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
        url: t?.feature_image_url || "",
        alt: t?.title || "",
        thumbnail: t?.thumbnail_image_url || t?.feature_image_url || "",
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

const transformPost = (item) => {
  const t = item.current_translation;
  return {
    id: item.id,
    published_at: item.published_at,
    title: t?.title || "Untitled",
    excerpt: t?.summary || "",
    content: t?.content || "",
    featured_image: {
      url: t?.feature_image_url || "",
      alt: t?.title || "",
      thumbnail: t?.thumbnail_image_url || t?.feature_image_url || "",
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
};

module.exports = { transformPost, transformPosts };
