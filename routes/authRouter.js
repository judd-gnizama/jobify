import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authControllers.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middlewares/validationMiddleware.js";

const router = Router();

router.post("/register", validateRegisterInput, registerUser);
router.post("/login", validateLoginInput, loginUser);

export { router as authRouter };
