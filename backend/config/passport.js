const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const AUTH_OPTIONS = {
  // Authorized redirect URIs - which we mentioned in Google console.
  callbackURL: "/auth/google/callback",
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  console.log("Google Profile", profile);
  done(null, profile);
};

passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback));
