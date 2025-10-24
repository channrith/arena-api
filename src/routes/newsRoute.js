const express = require("express");
const {
  listNews,
  getNewsById,
} = require("../controllers/news");
// const accessMiddleware = require("../middlewares/accessMiddleware");

const router = express.Router();

router.get("", listNews);
router.get("/:id", getNewsById);

module.exports = router;
