const express = require("express");

const mongoose = require("mongoose");
const connectDB = require("./config/db");

const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "./config/config.env"),
});

connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/food", require("./routes/food"));
app.use("/meals", require("./routes/meals"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
