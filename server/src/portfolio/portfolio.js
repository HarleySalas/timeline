const { catchAsync } = require("../../utils");
const action = {};

action.postHistory = catchAsync(async (req, res, next) => {
  console.log(req.body);

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
