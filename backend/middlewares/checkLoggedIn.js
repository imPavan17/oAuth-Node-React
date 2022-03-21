function checkLoggedIn(req, res, next) {
  const isLoggedIn = req.isAuthenticated() && req.user;

  if (!isLoggedIn) {
    return res.status(401).json({ message: "You must log in." });
  }
  next();
}

module.exports = checkLoggedIn;
