function checkLoggedIn(req, res, next) {
  const isLoggedIn = false;

  if (isLoggedIn) {
    next();
  } else {
    res.status(401).json({ message: "You must log in." });
  }
}

module.exports = checkLoggedIn;
