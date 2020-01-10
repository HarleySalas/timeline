export default function validatePortfolioName(values) {
  let errors = {};

  if (values.stocks.length < 1) {
    errors.stocks = "error";
    console.log("No stocks value");
  }

  //if there is no comma, check if greater than 6 characters
  if (values.stocks.length >= 1 && !values.stocks.includes(",") && values.stocks.length > 6) {
  }

  if (values.stocks.includes(",")) {
    const stockArr = values.stocks.split(",");

    stockArr.forEach((stock, index) => {
      if (stock.length > 6) {
        errors.stocks = "error";
      }
    });
  }

  return errors;
}
