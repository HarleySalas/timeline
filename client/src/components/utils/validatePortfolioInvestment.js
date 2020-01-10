export default function validatePortfolioName(values) {
  let errors = {};

  //Investment
  if (!values.investment) {
    errors.investment = "error";
  } else if (values.investment < 1) {
    errors.investment = "error";
  }

  return errors;
}
