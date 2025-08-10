import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  createUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", requireAuth, listUsers); // GET /users
router.get("/:email", requireAuth, getUser); // GET /users/:email
router.post("/", requireAuth, createUser); // POST /users
router.put("/:email", requireAuth, updateUser); // PUT /users/:email
router.delete("/:email", requireAuth, deleteUser); // DELETE /users/:email

export default router;
