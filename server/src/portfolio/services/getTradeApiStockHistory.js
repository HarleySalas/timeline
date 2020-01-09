"use strict";

const axios = require("axios");
const { AppError } = require("../../../utils");
const config = require("../../config/services/config");

const getTradeApiStockHistory = (req, next) => {
  //get an array of each stock symbol in req.body.stocks
  let symbols = [];
  req.body.stocks.forEach(obj => {
    symbols.push(obj.stock);
  });

  //format date to trade API requirement
  let isoStartDate = new Date(req.body.date).toISOString().slice(0, 10);

  /**
   * Trade API doesn't work consistently providing results for current or
   * day, or yesterday. Just to make it work for now, I chose the 6th
   * as a default date ("today")
   */
  let isoEndDate = "2020-01-06";

  //create Promises for each API request
  const startDateQuery = new Promise((resolve, reject) => {
    axios
      .get(`${config.tradingLink}history_multi_single_day?symbol=${symbols.join()}&date=${isoStartDate}${config.tradingApi}`)
      .then(response => {
        req.startQuery = response.data;
        if (!response.data.data) {
          reject(next(new AppError("No data found for startQuery.")));
        }
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });

  const endDateQuery = new Promise((resolve, reject) => {
    axios
      .get(`${config.tradingLink}history_multi_single_day?symbol=${symbols.join()}&date=${isoEndDate}${config.tradingApi}`)
      .then(response => {
        req.endQuery = response.data;
        if (!response.data.data) {
          reject(next(new AppError("No data found for endQuery.")));
        }
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });

  //Promise.all to run both queries simultaneously
  return Promise.all([startDateQuery, endDateQuery]).then(values => {
    //values now available in req.startQuery and req.endQuery
    return;
  });
};

module.exports = getTradeApiStockHistory;
