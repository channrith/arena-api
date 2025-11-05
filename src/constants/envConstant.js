require("dotenv").config();

const { APP_PORT } = process.env;

const ENV = {
  APP_PORT: APP_PORT ? parseInt(APP_PORT) : 3001,
};

module.exports = { ENV };
