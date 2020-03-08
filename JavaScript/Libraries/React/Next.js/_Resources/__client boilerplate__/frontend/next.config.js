const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

// This module updates the .env variables every time they are edited
module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  }
};
