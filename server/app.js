require("dotenv").config();

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use(indexRoutes);

const cohortRouter = require("./routes/cohort.routes");
app.use(cohortRouter);

const studentRouter = require("./routes/student.routes");
app.use(studentRouter);

require("./error-handling")(app);

module.exports = app;