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
      link: `/make/${item.slug}/global`,
    };
  });

  return vehicles;
};

const transformVehicleModels = (apiResponse) => {
  if (!apiResponse?.data) return [];

  return apiResponse.data.map((yearGroup) => ({
    year: yearGroup.year,
    models: yearGroup.models.map((item) => {
      const baseSlug = item.slug;
      const maker = item.maker?.slug;
      const marketType = item.is_global_model ? "global" : "local";

      return {
        id: item.id,
        name: item.name || "Untitled",
        slug: `${baseSlug}-${item.id}`,
        link: `/make/${maker}/${marketType}/${baseSlug}-${item.id}`,
        image:
          item.thumbnail_image_url ||
          item.feature_image_url ||
          item.thumbnail_image ||
          item.image_url ||
          "",
      };
    }),
  }));
};

module.exports = {
  transformVehicles,
  transformVehicleMakers,
  transformVehicleModels,
};
