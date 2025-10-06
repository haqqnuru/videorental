const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token"); // frontend must send token in header
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwtPrivateKey");
    req.user = decoded; // attach payload to request
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
