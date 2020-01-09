const { catchAsync } = require("../../utils");
const getTradeApiStockHistory = require("./services/getTradeApiStockHistory");
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
  await getTradeApiStockHistory(req, next);

  res.status(201).json({
    status: "success",
    message: "Portfolio history successfully created."
  });
});

action.getHistory = catchAsync(async (req, res, next) => {
  let id = req.params.historyId;
  console.log(id);

  res.status(200).json({
    status: "success",
    message: "Success!"
  });
});

module.exports = action;
