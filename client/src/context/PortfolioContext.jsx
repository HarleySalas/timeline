import React, { useState, createContext } from "react";

export const PortfolioContext = createContext();

const INITIAL_STATE = {
  name: "",
  date: null,
  investment: "",
  stocks: ""
};

export const PortfolioProvider = props => {
  const [portfolio, setPortfolio] = useState(INITIAL_STATE);

  return <PortfolioContext.Provider value={[portfolio, setPortfolio]}>{props.children}</PortfolioContext.Provider>;
};
