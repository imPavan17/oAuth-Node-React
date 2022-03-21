const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const AUTH_OPTIONS = {
  // Authorized redirect URIs - which we mentioned in Google console.
  callbackURL: "/auth/google/callback",
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

const verifyCallback = (accessToken, _refreshToken, profile, done) => {
  //   console.log("TOKEN ->", accessToken);
  //   console.log("PROFILE ->", profile);
  done(null, profile);
};

passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((id, done) => {
  done(null, id);
});
