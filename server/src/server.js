const express = require("express");
const connectDB = require("./config/db");

const passport = require("passport");
const setupPassport = require("./config/passport");

const session = require("express-session");
const MongoStore = require("connect-mongo");

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
        // origin: "capacitor://192.168.0.172",
        // credentials: true,
        origin: true,
        credentials: true,
    })
);

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
            secure: false,
            httpOnly: false,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

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
