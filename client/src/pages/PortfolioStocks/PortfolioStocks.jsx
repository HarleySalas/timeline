import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./PortfolioStocks.scss";

import PortfolioContainer from "../../components/PortfolioContainer/PortfolioContainer";
import Button from "../../components/Button/Button";

import { useFormValidate, validatePortfolioStocks } from "../../components/utils";
import { PortfolioContext } from "../../context/PortfolioContext";

const PortfolioStocks = () => {
  const history = useHistory();
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(false);

  const [portfolio, setPortfolio] = useContext(PortfolioContext);

  const submit = () => {
    if (!error) {
      setPortfolio({ ...portfolio, stocks: values.stocks });
      history.push("/portfolio/percentages");
    }
  };

  const INITIAL_STATE = {
    stocks: portfolio.stocks
  };

  const { handleChange, handleBlur, handleSubmit, values, errors } = useFormValidate(INITIAL_STATE, validatePortfolioStocks, submit);

  useEffect(() => {
    if (!portfolio.investment) {
      history.push("/portfolio/investment");
    }
  }, []);

  useEffect(() => {
    if (initialLoad) {
      handleBlur();
      setInitialLoad(false);
    }
  }, [initialLoad, handleBlur]);

  useEffect(() => {
    if (values.stocks.split(",").length > 2) {
      setError(true);
    } else {
      setError(false);
    }
  }, [values.stocks, setError]);

  return (
    <div className="page">
      <PortfolioContainer back>
        <h3 className="portfolio-stocks__heading">What stocks did you invest in?</h3>
        <span className="portfolio-stocks__subheading">Please enter each stock symbol, separated by commas.</span>
        <form onSubmit={handleSubmit} className="portfolio-stocks__form">
          {error && <span className="portfolio-stocks__error">Demo API only allows up to 2 symbols per request.</span>}
          <input
            type="text"
            name="stocks"
            autoComplete="off"
            className="portfolio-stocks__input"
            placeholder="AAPL, AMZN, TSLA"
            value={values.stocks}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.stocks}
          />
          <Button
            btnText="Next Step"
            btnStyle="primary"
            onClick={handleSubmit}
            addClass={`${errors.stocks && "disabled"} ${error && "disabled"}`}
          />
        </form>
      </PortfolioContainer>
    </div>
  );
};

export default PortfolioStocks;
