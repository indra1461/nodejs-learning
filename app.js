const express = require("express");
const logger = require("./middlewares/logger");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(express.json());

app.use(logger);

app.use("/users", userRoutes);

module.exports = app;
