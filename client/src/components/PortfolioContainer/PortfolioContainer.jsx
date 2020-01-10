import React from "react";
import { useHistory } from "react-router-dom";
import "./PortfolioContainer.scss";

const PortfolioContainer = ({ children, back }) => {
  const history = useHistory();

  return (
    <section className="container portfolio-container">
      {back && (
        <button className="portfolio-container__back" onClick={() => history.goBack()}>
          {"< Back"}
        </button>
      )}
      {children}
    </section>
  );
};

export default PortfolioContainer;
