const express = require("express");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(express.json());

app.use(logger);

app.use("/users", userRoutes);

app.use(errorHandler);

module.exports = app;
