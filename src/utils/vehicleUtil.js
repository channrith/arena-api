const transformVehicles = (apiResponse) => {
  const vehicles = apiResponse.data.map((item) => {

    const baseSlug = item.slug;
    const maker = item.maker?.slug;
    const marketType = item.is_global_model ? "global" : "local";
    return {
      id: item.id,
      name: item.name || "Untitled",
      slug: `${baseSlug}-${item.id}`,
      link: `/make/${maker}/${marketType}/${baseSlug}-${item.id}`,
      image: item.thumbnail_image || item.image_url || "",
    };
  });

  return vehicles;
};

module.exports = { transformVehicles };
