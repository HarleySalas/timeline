import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./Navbar/Navbar";

import HomePage from "../pages/HomePage/HomePage";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
};

export default App;
