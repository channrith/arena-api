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
      image: item.thumbnail_image_url || item.feature_image_url || "",
    };
  });

  return vehicles;
};

const transformVehicleMakers = (apiResponse) => {
  const vehicles = apiResponse.data.map((item) => {
    return {
      src: item.image_url,
      alt: item.name || "",
      slug: item.slug || "",
      link: `/make/${item.slug}/local`,
    };
  });

  return vehicles;
};

module.exports = { transformVehicles, transformVehicleMakers };
