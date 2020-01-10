"use strict";

/**
 * Render index page
 */
const index = (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    res.render("index");
  } else {
    // res.json("Server ready");
    next();
  }
};

module.exports = {
  index
};
