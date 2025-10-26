const getNewsById = require("./getNewsByIdAction");
const listNews = require("./listNewsAction");
const listNewsForSitemap = require("./listNewsForSitemapAction");
const listHighlightsNews = require("./listHighlightsNewsAction");

module.exports = {
  listHighlightsNews,
  listNews,
  listNewsForSitemap,
  getNewsById,
};
