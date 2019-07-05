const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWT_SECRET = require("../config");

const Personnel = require("../models").personnel;

// ExtractJwt for extracting token
const ExtractJWT = passportJWT.ExtractJwt;

// LocalStrategy for authentication
const LocalStrategy = require("passport-local").Strategy;

// JWTStrategy for authentication strategy
const JWTStrategy = passportJWT.Strategy;
let jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

// jwt strategy
passport.use(
  "jwt",
  new JWTStrategy(jwtOptions, async (payload, done) => {
    try {
      // find the user specified in token
      const personnel = await Personnel.findById({
        where: { personnel_id: payload.sub }
      });

      //if user doesn't exist handle it.
      if (!personnel) {
        return done(null, false);
      }

      // otherwise return personnel
      return done(null, personnel);
    } catch (error) {
      done(error, false);
    }
  })
);

// local strategy
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "phone_number",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, phone_number, password, done) => {
      // find user specified by phone_number
      await Personnel.findAll({
        limit: 1,
        where: { personnel_phone: phone_number }
      })
        .then(foundPersonnel => {
          if (!foundPersonnel) {
            return done(null, false, { msg: "User not found" });
          }

          // validate password
          if (!foundPersonnel.comparePassword(password)) {
            return done(error, false, { msg: error });
          }

          // otherwise, return user with the cb function
          done(null, foundPersonnel, { msg: "User found" });
        })
        .catch(err => console.log(err));
    }
  )
);

module.exports = {
  passport
};
