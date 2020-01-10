"use strict";

const { AppError } = require("../../../utils");

/**
 * @param {object} a req.startQuery
 * @param {object} b req.endQuery
 * @returns {boolean} true if Object.keys match
 */
const compareKeys = (a, b) => {
  let aKeys = Object.keys(a).sort();
  let bKeys = Object.keys(b).sort();
  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
};

const aggregatePortfolioData = (req, next) => {
  return new Promise((resolve, reject) => {
    //ensure sure both datsets have data from api
    if (!req.startQuery.data || !req.endQuery.data) {
      reject(next(new AppError("No stock symbols were found matching your request.", 404)));
    }
    //ensure that startData and endData keys match
    if (!compareKeys(req.startQuery.data, req.endQuery.data)) {
      reject(next(new AppError("One or more stocks entered did not exist on your start date.", 404)));
    }

    let startData = req.startQuery;
    let endData = req.endQuery;

    //sort stocks from req.body.stocks, to match API response order (ASC)
    let sortedBodyStocks = req.body.stocks.sort((a, b) => {
      return a.stock > b.stock ? -1 : a.stock < b.stock ? 1 : 0;
    });

    //get array of stock symbol keys
    let keysArr = Object.keys(startData.data);

    //Create Stocks Object for final result
    const aggStockData = Object.assign(
      ...keysArr.map((key, index) => ({
        [key]: {
          startPrice: startData.data[key].low,
          endPrice: endData.data[key].high,
          investmentPercent: sortedBodyStocks[index].percentage
        }
      }))
    );

    //Combine all data for final result
    let aggregatedData = {
      name: req.body.name,
      startDate: startData.date,
      endDate: endData.date,
      investment: req.body.investment,
      stocks: aggStockData
    };

    resolve(aggregatedData);
  });
};

module.exports = aggregatePortfolioData;
