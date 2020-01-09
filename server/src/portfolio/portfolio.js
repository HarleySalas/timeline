"use strict";

const { catchAsync } = require("../../utils");
const getTradeApiStockHistory = require("./services/getTradeApiStockHistory");
const aggregatePortfolioData = require("./services/aggregatePortfolioData.js");
const Portfolio = require("./portfolio.model");
const action = {};

/**
 * @param {obj} req - req.body should contain the following values:
 * {
 *  name: {string},
 *  date: {date},
 *  investment: {number}
 *  stocks: {array} [
 *    {
 *      stock: {string (stock symbol)}, percentage: {number}
 *    }
 *    ...
 *  ]
 * }
 */
action.postHistory = catchAsync(async (req, res, next) => {
  //attach API response to req.startQuery and req.endQuery
  await getTradeApiStockHistory(req, next);

  //aggregate the API response data with req.body to save in db
  const aggData = await aggregatePortfolioData(req, next);

  //save aggregated data in database
  const newPortfolioHistory = new Portfolio(aggData);
  let portfolio = await newPortfolioHistory.save();

  res.status(201).json({
    status: "success",
    message: "Portfolio history successfully created.",
    portfolioId: portfolio._id
  });
});

/**
 * @req req.params.historyId should be mongo _id
 */
action.getHistory = catchAsync(async (req, res, next) => {
  let id = req.params.historyId;

  //fetch data by id from db
  const data = await Portfolio.findById(id);

  res.status(200).json({
    status: "success",
    message: "Success!",
    data: data
  });
});

module.exports = action;
