"use strict";

const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is required."]
  },
  startDate: {
    type: String,
    required: [true, "You must provide a start date."]
  },
  endDate: {
    type: String
  },
  investment: {
    type: String,
    required: [true, "You must provide an investment amount."]
  },
  stocks: {
    type: Object
  }
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
