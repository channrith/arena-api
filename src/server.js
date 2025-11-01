const express = require("express");
const cors = require("cors");
const { ENV } = require("./constants/envConstant");
const { newsRoute, vehicleRoute } = require("./routes");
const {
  listHighlightsNews,
  listNewsForSitemap,
} = require("./controllers/news");

const app = express();
app.use(cors());
app.use("/api/vehicle", vehicleRoute);
app.use("/api/news", newsRoute);
app.use("/api/highlights", listHighlightsNews);
app.use("/api/list-for-sitemap", listNewsForSitemap);

app.listen(ENV.APP_PORT, () => {
  console.log(`Server running on port ${ENV.APP_PORT}`);
});
