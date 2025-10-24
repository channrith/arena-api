const express = require("express");
const cors = require("cors");
const { ENV } = require("./constants/envConstant");
const { newsRoute, newsHighlightsRoute } = require("./routes");

const app = express();
app.use(cors());
app.use("/api/news", newsRoute);
app.use("/api/highlights", newsHighlightsRoute);

app.listen(ENV.APP_PORT, () => {
  console.log(`Server running on port ${ENV.APP_PORT}`);
});
