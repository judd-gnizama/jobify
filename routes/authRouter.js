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
import rateLimit from "express-rate-limit";

const router = Router();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { msg: "IP rate limit exceeded. Retry in 15 minutes" },
});

router.post("/register", apiLimiter, validateRegisterInput, registerUser);
router.post("/login", apiLimiter, validateLoginInput, loginUser);
router.get("/logout", logout);

export { router as authRouter };
