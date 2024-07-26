import { Router } from "express";
import {
  loginUser,
  logout,
  registerUser,
} from "../controllers/authControllers.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middlewares/validationMiddleware.js";

const router = Router();

router.post("/register", validateRegisterInput, registerUser);
router.post("/login", validateLoginInput, loginUser);
router.get("/logout", logout);

export { router as authRouter };
