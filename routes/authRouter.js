import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authControllers.js";
import { validateRegisterInput } from "../middlewares/validationMiddleware.js";

const router = Router();

router.post("/register", validateRegisterInput, registerUser);
router.post("/login", loginUser);

export { router as authRouter };
