import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userControllers.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
import { authorizePermissions } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", [
  authorizePermissions("admin"),
  getApplicationStats,
]); // square brackets are optional
router.patch("/update-user", validateUpdateUserInput, updateUser);

export { router as userRouter };
