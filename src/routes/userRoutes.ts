import { Router } from "express";
import {
  getCurrentUser,
  updateUserProfile,
} from "../controllers/UserController";

const router = Router();

router.get("/user", getCurrentUser);
router.put("/user", updateUserProfile);

export default router;
