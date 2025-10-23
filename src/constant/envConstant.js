require("dotenv").config();

const { APP_PORT, POST_SERVICE_URL, POST_SERVICE_TOKEN } = process.env;

const ENV = {
  APP_PORT: APP_PORT ? parseInt(APP_PORT) : 3001,
  POST_SERVICE_URL: POST_SERVICE_URL || "https://admin.arenacambodiaauto.com",
  POST_SERVICE_TOKEN,
};

module.exports = { ENV };
