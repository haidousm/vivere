const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/User");

const fs = require("fs");
const PUB_KEY = fs.readFileSync(`${__dirname}/keys/public.pem`);

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
};

const setupPassport = (passport) => {
    passport.use(
        new JWTStrategy(jwtOptions, async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload.sub);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                return done(err, false);
            }
        })
    );
};

module.exports = setupPassport;
