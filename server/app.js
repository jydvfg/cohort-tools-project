require("dotenv").config();

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const cohortRouter = require("./routes/cohort.routes");
app.use("", cohortRouter);

const studentRouter = require("./routes/student.routes");
app.use("", studentRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const { errorHandler, notFoundHandler } = require("./error-handling");
app.use(errorHandler);
app.use(notFoundHandler);

module.exports = app;
