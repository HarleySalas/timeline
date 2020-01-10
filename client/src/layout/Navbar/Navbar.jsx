import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

import { ReactComponent as Logo } from "./assets/logo-01.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar__container">
        <Link to="/">
          <Logo className="navbar__logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
