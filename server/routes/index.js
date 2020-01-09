"use strict";

const portfolioRoute = require("./portfolio");
const homeRoute = require("./home");

//Initialize Routes
const init = app => {
  app.use("*", homeRoute);
  app.use("/api/v1/portfolio", portfolioRoute);
};

module.exports = {
  init
};
