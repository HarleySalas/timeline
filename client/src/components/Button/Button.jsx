import React from "react";
import { Link } from "react-router-dom";

import "./Button.scss";

const Button = props => {
  const btnStyle = `
  button
  ${props.btnStyle === "primary" && "button--primary"}
  ${props.btnStyle === "white" && "button--white"}
  ${!props.btnSize && "button--md"}
  ${!props.square && "button--rounded"}
  ${props.addClass && props.addClass}
  ${props.disabled && "disabled"}
  `;

  const btnElement = (
    <button className={btnStyle} onClick={props.onClick} ref={props.btnRef}>
      {props.btnText}
    </button>
  );

  if (props.linkTo) {
    return <Link to={props.linkTo}>{btnElement}</Link>;
  }
  return btnElement;
};

export default Button;
