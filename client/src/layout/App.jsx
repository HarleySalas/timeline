import React from "react";
import { Switch, Route } from "react-router-dom";

import { PortfolioProvider } from "../context/PortfolioContext";

import Navbar from "./Navbar/Navbar";

import HomePage from "../pages/HomePage/HomePage";
import PortfolioName from "../pages/PortfolioName/PortfolioName";
import PortfolioDate from "../pages/PortfolioDate/PortfolioDate";

const App = () => {
  return (
    <PortfolioProvider>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/portfolio/name" component={PortfolioName} />
          <Route exact path="/portfolio/date" component={PortfolioDate} />
        </Switch>
      </div>
    </PortfolioProvider>
  );
};

export default App;
