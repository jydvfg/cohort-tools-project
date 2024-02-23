const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const FRONTEND_URL = process.env.ORIGIN;

module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use(cors({ origin: [FRONTEND_URL] }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
