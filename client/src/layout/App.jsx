import React from "react";
import { Switch, Route } from "react-router-dom";

import { PortfolioProvider } from "../context/PortfolioContext";

import Navbar from "./Navbar/Navbar";

import HomePage from "../pages/HomePage/HomePage";

const App = () => {
  return (
    <PortfolioProvider>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    </PortfolioProvider>
  );
};

export default App;
