import { Router } from "express";
import User from "../models/User.js";

const router = Router();

// POST /login
// POST /login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // DEBUG
  console.log("[LOGIN] body =", req.body);
  console.log(
    "[LOGIN] email reçu =",
    email,
    "| password length =",
    password?.length
  );

  const user = await User.findOne({ email });
  console.log("[LOGIN] user trouvé ?", !!user);

  if (user) {
    const ok = await user.comparePassword(password);
    console.log("[LOGIN] comparePassword =", ok);
    if (!ok) {
      if (req.accepts("html")) {
        return res
          .status(401)
          .send(`<h1>Mot de passe invalide</h1><a href="/">Retour</a>`);
      }
      return res
        .status(401)
        .render("home", { user: null, error: "Identifiants invalides" });
    }
  }

  if (!user) {
    if (req.accepts("html")) {
      return res
        .status(401)
        .send(`<h1>Utilisateur introuvable</h1><a href="/">Retour</a>`);
    }
    return res.status(401).json({ error: "Invalid credentials" });
  }

  req.session.user = { username: user.username, email: user.email };

  // Sauvegarder la session avant de rediriger
  req.session.save((err) => {
    if (err) {
      console.error("[LOGIN] session.save error:", err);
      if (req.accepts("html")) return res.status(500).send("Erreur session");
      return res.status(500).json({ error: "Session error" });
    }
    if (req.accepts("html")) return res.redirect("/dashboard");
    res.json({ message: "Logged in" });
  });
});

// GET /logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    if (req.accepts("html")) return res.redirect("/");
    res.json({ message: "Logged out" });
  });
});

export default router;
