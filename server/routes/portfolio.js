"use strict";

const express = require("express");
const router = express.Router();
const portfolio = require("../src/portfolio");

router.post("/history", portfolio.postHistory);
router.get("/history/:historyId", portfolio.getHistory);

module.exports = router;
