const express = require("express");
const connectDB = require("./config/db");

const passport = require("passport");
const setupPassport = require("./config/passport");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "./config/config.env"),
});

setupPassport(passport);
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collection: "sessions",
        }),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("nothing to see here");
});

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/food", require("./routes/food"));
app.use("/meals", require("./routes/meals"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
