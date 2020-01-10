import React from "react";
import "./HomeHero.scss";

import Button from "../../../components/Button/Button";

const HomeHero = () => {
  return (
    <div className="home-hero">
      <div className="container home-hero__container">
        <h1 className="home-hero__heading">Share Your History</h1>
        <span className="home-hero__subtitle">How much would your stock portfolio be worth today?</span>
        <Button btnText="Get Started" btnStyle="white" linkTo="/portfolio/name" />
      </div>
    </div>
  );
};

export default HomeHero;
