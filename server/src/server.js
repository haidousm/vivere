const express = require("express");
const connectDB = require("./config/db");

const passport = require("passport");
const setupPassport = require("./config/passport");

const cors = require("cors");

const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "./config/config.env"),
});

setupPassport(passport);
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(passport.initialize());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("nothing to see here");
});

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/food", require("./routes/food"));
app.use("/meals", require("./routes/meals"));
app.use("/diary", require("./routes/diary"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
