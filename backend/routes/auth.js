const router = require("express").Router();
const passport = require("passport");

// Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"], // Specifies which data we're requesting from Google
  })
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(); // Removed req.user
  return res.redirect("/");
});

// Failure
router.get("/failure", (req, res) => {
  res.send("Failed to Login");
});

// this gets called when we submit our email and password
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "/",
    session: true, // By default - true
  })
);

module.exports = router;
