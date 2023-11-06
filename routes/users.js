var express = require("express");
var router = express.Router();
import { useState } from "react";
import "./App.css";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
