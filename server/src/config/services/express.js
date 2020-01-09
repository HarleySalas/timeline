"use strict";

const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");

const init = () => {
  const app = express();
  app.use(express.json());
  const corsOptions = {
    origin: true,
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Headers": true,
    "Access-Control-Expose-Headers": true,
    credentials: true
  };

  app.use("/build/static", express.static(config.clientStaticFolder));
  app.use("/build", express.static(config.clientBuildFolder));
  app.set("views", config.clientBuildFolder);
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");
  app.use(bodyParser.urlencoded({ extended: true }));
  const limiter = rateLimit({
    max: 250,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP. Please try again in an hour."
  });

  app.use("/api", limiter);
  app.use(mongoSanitize());
  app.use(xss());
  app.use(cors(corsOptions));

  return app;
};

module.exports = {
  init
};
