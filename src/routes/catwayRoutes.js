import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  listCatways,
  getCatway,
  createCatway,
  updateCatway,
  deleteCatway,
} from "../controllers/catwayController.js";

const router = Router();

router.get("/", requireAuth, listCatways); // GET /catways
router.get("/:id", requireAuth, getCatway); // GET /catways/:id
router.post("/", requireAuth, createCatway); // POST /catways
router.put("/:id", requireAuth, updateCatway); // PUT /catways/:id
router.delete("/:id", requireAuth, deleteCatway); // DELETE /catways/:id

export default router;
