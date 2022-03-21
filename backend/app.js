const fs = require("fs");
const path = require("path");
const https = require("https");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("dotenv").config();

require("./config/passport"); // Passport Setup
const authRoutes = require("./routes/auth");
const checkLoggedIn = require("./middlewares/checkLoggedIn");

const app = express();
app.use(helmet());
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["secret key", "secret secret"],
  })
);
app.use(passport.initialize());
// This will allow the deserializeUser function to be called
app.use(passport.session());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/auth", authRoutes);

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
