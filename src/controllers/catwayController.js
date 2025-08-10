import Catway from "../models/Catway.js";

/**
 * Lister tous les catways
 */
export const listCatways = async (_req, res) => {
  const catways = await Catway.find().sort({ catwayNumber: 1 });
  if (res.req.accepts("html")) return res.render("catways/list", { catways });
  res.json(catways);
};

/**
 * Obtenir un catway par numéro
 */
export const getCatway = async (req, res) => {
  const catway = await Catway.findOne({ catwayNumber: Number(req.params.id) });
  if (!catway) return res.status(404).json({ error: "Not found" });
  if (req.accepts("html")) return res.render("catways/detail", { catway });
  res.json(catway);
};

/**
 * Créer un catway
 */
export const createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    const catway = await Catway.create({
      catwayNumber,
      catwayType,
      catwayState,
    });
    if (req.accepts("html")) return res.redirect("/catways");
    res.status(201).json(catway);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

/**
 * Mettre à jour l'état d'un catway
 */
export const updateCatway = async (req, res) => {
  const { catwayState } = req.body;
  const updated = await Catway.findOneAndUpdate(
    { catwayNumber: Number(req.params.id) },
    { catwayState },
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: "Not found" });
  if (req.accepts("html"))
    return res.redirect(`/catways/${updated.catwayNumber}`);
  res.json(updated);
};

/**
 * Supprimer un catway
 */
export const deleteCatway = async (req, res) => {
  await Catway.findOneAndDelete({ catwayNumber: Number(req.params.id) });
  if (req.accepts("html")) return res.redirect("/catways");
  res.status(204).end();
};
