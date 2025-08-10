import Reservation from "../models/Reservation.js";

/**
 * Lister toutes les réservations d'un catway
 */
export const listReservations = async (req, res) => {
  const catwayNumber = Number(req.params.id);
  const reservations = await Reservation.find({ catwayNumber }).sort({
    startDate: -1,
  });
  if (req.accepts("html"))
    return res.render("reservations/list", { catwayNumber, reservations });
  res.json(reservations);
};

/**
 * Obtenir une réservation précise
 */
export const getReservation = async (req, res) => {
  const catwayNumber = Number(req.params.id);
  const reservation = await Reservation.findOne({
    catwayNumber,
    _id: req.params.idReservation,
  });
  if (!reservation) return res.status(404).json({ error: "Not found" });
  if (req.accepts("html"))
    return res.render("reservations/detail", { reservation });
  res.json(reservation);
};

/**
 * Créer une réservation
 */
export const createReservation = async (req, res) => {
  try {
    const catwayNumber = Number(req.params.id);
    const doc = await Reservation.create({ ...req.body, catwayNumber });
    if (req.accepts("html"))
      return res.redirect(`/catways/${catwayNumber}/reservations`);
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

/**
 * Mettre à jour une réservation
 */
export const updateReservation = async (req, res) => {
  const catwayNumber = Number(req.params.id);
  const updated = await Reservation.findOneAndUpdate(
    { catwayNumber, _id: req.params.idReservation },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: "Not found" });
  if (req.accepts("html"))
    return res.redirect(`/catways/${catwayNumber}/reservations/${updated._id}`);
  res.json(updated);
};

/**
 * Supprimer une réservation
 */
export const deleteReservation = async (req, res) => {
  const catwayNumber = Number(req.params.id);
  await Reservation.findOneAndDelete({
    catwayNumber,
    _id: req.params.idReservation,
  });
  if (req.accepts("html"))
    return res.redirect(`/catways/${catwayNumber}/reservations`);
  res.status(204).end();
};
