import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./PortfolioName.scss";

import PortfolioContainer from "../../components/PortfolioContainer/PortfolioContainer";
import Button from "../../components/Button/Button";

import { useFormValidate, validatePortfolioName } from "../../components/utils";
import { PortfolioContext } from "../../context/PortfolioContext";

const PortfolioName = () => {
  const history = useHistory();
  const [initialLoad, setInitialLoad] = useState(true);

  const [portfolio, setPortfolio] = useContext(PortfolioContext);

  const submit = () => {
    if (!errors.name) {
      setPortfolio({ ...portfolio, name: values.name });
      history.push("/portfolio/date");
    }
  };

  const INITIAL_STATE = {
    name: portfolio.name
  };

  const { handleChange, handleBlur, handleSubmit, values, errors } = useFormValidate(INITIAL_STATE, validatePortfolioName, submit);

  useEffect(() => {
    if (initialLoad) {
      //make sure that even if a user goes back to this page, error state will be accurate
      handleBlur();
      setInitialLoad(false);
    }
  }, [initialLoad, handleBlur]);
  return (
    <div className="page">
      <PortfolioContainer>
        <h3 className="portfolio-name__heading">What's your name?</h3>
        <form onSubmit={handleSubmit} className="portfolio-name__form">
          <input
            type="text"
            name="name"
            autoComplete="off"
            className="portfolio-name__input"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.name}
          />
          <Button btnText="Next Step" btnStyle="primary" onClick={handleSubmit} addClass={errors.name && "disabled"} />
        </form>
      </PortfolioContainer>
    </div>
  );
};

export default PortfolioName;
