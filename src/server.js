const express = require("express");
const cors = require("cors");
const { ENV } = require("./constants/envConstant");
const { newsRoute, vehicleRoute } = require("./routes");
const {
  listHighlightsNews,
  listNewsForSitemap,
} = require("./controllers/news");
const { listPoster } = require("./controllers/cars");
const { listVideos } = require("./controllers/videos");

const app = express();
app.use(cors());
app.use("/api/videos/:slug", listVideos);
app.use("/api/posters", listPoster);
app.use("/api/vehicle", vehicleRoute);
app.use("/api/news", newsRoute);
app.use("/api/highlights", listHighlightsNews);
app.use("/api/list-for-sitemap", listNewsForSitemap);

app.listen(ENV.APP_PORT, () => {
  console.log(`Server running on port ${ENV.APP_PORT}`);
});
