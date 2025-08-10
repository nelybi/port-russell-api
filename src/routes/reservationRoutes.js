import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  listReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationController.js";

const router = Router({ mergeParams: true });

// Sous-ressource de catways : /catways/:id/...
router.get("/:id/reservations", requireAuth, listReservations);
router.get("/:id/reservations/:idReservation", requireAuth, getReservation);
router.post("/:id/reservations", requireAuth, createReservation);
router.put("/:id/reservations/:idReservation", requireAuth, updateReservation);
router.delete(
  "/:id/reservations/:idReservation",
  requireAuth,
  deleteReservation
);

export default router;
