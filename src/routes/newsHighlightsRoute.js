const express = require("express");
const { listHighlightsNews } = require("../controllers/news");
// const accessMiddleware = require("../middlewares/accessMiddleware");

const router = express.Router();

router.get("", listHighlightsNews);

module.exports = router;
