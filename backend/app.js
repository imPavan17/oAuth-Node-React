const fs = require("fs");
const path = require("path");
const https = require("https");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");
require("dotenv").config(); // It takes all the values in our .env file

const checkLoggedIn = require("./middlewares/checkLoggedIn");

const app = express();

app.use(helmet());

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};
const AUTH_OPTIONS = {
  // Authorized redirect URIs - which we mentioned in Google console.
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  console.log("Google Profile", profile);
  done(null, profile);
};

passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Read the session from the cookie
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    keys: ["secret key"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Login
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"], // Specifies which data we're requesting from Google
  })
);

// this gets called when we submit our email and password
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true, // By default - true
  })
);

// Logout
app.get("/auth/logout", (req, res) => {});

// Failure
app.get("/failure", (req, res) => {
  res.send("Failed to Login");
});

app.get("/secret", checkLoggedIn, (req, res) => {
  res.send({
    message: "Your secret value is 047",
  });
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(3000, () => {
    console.log("listening on port 3000...");
  });
