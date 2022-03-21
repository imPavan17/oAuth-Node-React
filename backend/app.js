const fs = require("fs");
const path = require("path");
const https = require("https");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
require("dotenv").config();
require("./config/passport");

const authRoutes = require("./routes/auth");
const checkLoggedIn = require("./middlewares/checkLoggedIn");

const app = express();
app.use(helmet());
app.use(passport.initialize());

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
