const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
const { validatePassword } = require("../utils/password");

const setupPassport = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(
        new LocalStrategy(
            { usernameField: "email", passwordField: "password" },
            async (email, password, done) => {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false, { message: "Incorrect email." });
                }
                if (!validatePassword(password, user.hash, user.salt)) {
                    return done(null, false, {
                        message: "Incorrect password.",
                    });
                }
                return done(null, user);
            }
        )
    );
};

module.exports = setupPassport;
