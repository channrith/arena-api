const express = require("express");
const cors = require("cors");
const { ENV } = require("./constants/envConstant");
const { newsRoute } = require("./routes");

const app = express();
app.use(cors());
app.use("/api/news", newsRoute);

app.listen(ENV.APP_PORT, () => {
  console.log(`Server running on port ${ENV.APP_PORT}`);
});
