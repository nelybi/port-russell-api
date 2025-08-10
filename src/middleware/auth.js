export const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    if (req.accepts("html")) return res.redirect("/");
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};
