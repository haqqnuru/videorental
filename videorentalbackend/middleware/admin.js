function admin(req, res, next) {
  // auth middleware runs before this, so req.user should already exist
  if (!req.user.isAdmin)
    return res.status(403).send("Access denied. Admins only.");

  next();
}

module.exports = admin;
