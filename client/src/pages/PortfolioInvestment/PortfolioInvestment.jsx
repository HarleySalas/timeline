import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./PortfolioInvestment.scss";

import PortfolioContainer from "../../components/PortfolioContainer/PortfolioContainer";
import Button from "../../components/Button/Button";

import { useFormValidate, validatePortfolioInvestment } from "../../components/utils";
import { PortfolioContext } from "../../context/PortfolioContext";

const PortfolioInvestment = () => {
  const history = useHistory();
  const [initialLoad, setInitialLoad] = useState(true);

  const [portfolio, setPortfolio] = useContext(PortfolioContext);

  const submit = () => {
    setPortfolio({ ...portfolio, investment: values.investment });
    history.push("/portfolio/stocks");
  };

  const INITIAL_STATE = {
    investment: portfolio.investment
  };

  const { handleChange, handleBlur, handleSubmit, values, errors } = useFormValidate(INITIAL_STATE, validatePortfolioInvestment, submit);

  useEffect(() => {
    if (!portfolio.date) {
      history.push("/portfolio/date");
    }
  }, [history, portfolio.date]);

  useEffect(() => {
    if (initialLoad) {
      handleBlur();
      setInitialLoad(false);
    }
  }, [initialLoad, handleBlur, setInitialLoad]);
  return (
    <div className="page">
      <PortfolioContainer back>
        <h3 className="portfolio-investment__heading">How much did you invest?</h3>
        <form onSubmit={handleSubmit} className="portfolio-investment__form">
          <div className="portfolio-investment__input__wrapper">
            <input
              type="number"
              name="investment"
              autoComplete="off"
              className="portfolio-investment__input"
              placeholder="Amount"
              value={values.investment}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.investment}
            />
          </div>
          <Button btnText="Next Step" btnStyle="primary" onClick={handleSubmit} addClass={errors.investment && "disabled"} />
        </form>
      </PortfolioContainer>
    </div>
  );
};

export default PortfolioInvestment;
