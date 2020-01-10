export default function validatePortfolioName(values) {
  let errors = {};

  //Name
  if (!values.name) {
    errors.name = "error";
  } else if (values.name.length < 2) {
    errors.name = "error";
  }

  return errors;
}
