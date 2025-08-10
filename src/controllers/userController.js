import User from "../models/User.js";

/**
 * Créer un utilisateur
 */
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (req.accepts("html")) return res.redirect("/users");
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

/**
 * Lister les utilisateurs
 */
export const listUsers = async (req, res) => {
  const users = await User.find().select("-password");
  if (req.accepts("html")) return res.render("users/list", { users });
  res.json(users);
};

/**
 * Récupérer un utilisateur par email
 */
export const getUser = async (req, res) => {
  const user = await User.findOne({ email: req.params.email }).select(
    "-password"
  );
  if (!user) return res.status(404).json({ error: "Not found" });
  if (req.accepts("html")) return res.render("users/detail", { user });
  res.json(user);
};

/**
 * Mettre à jour un utilisateur
 */
export const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    ).select("-password");
    if (!user) return res.status(404).json({ error: "Not found" });
    if (req.accepts("html")) return res.redirect(`/users/${user.email}`);
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

/**
 * Supprimer un utilisateur
 */
export const deleteUser = async (req, res) => {
  await User.findOneAndDelete({ email: req.params.email });
  if (req.accepts("html")) return res.redirect("/users");
  res.status(204).end();
};
