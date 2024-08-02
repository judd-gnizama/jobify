import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controllers/jobControllers.js";
import {
  validateIdParam,
  validateJobInput,
} from "../middlewares/validationMiddleware.js";
import { checkForTestUser } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getAllJobs);
router.post("/", checkForTestUser, validateJobInput, createJob);
router.get("/:id", validateIdParam, getJob);
router.patch(
  "/:id",
  checkForTestUser,
  validateIdParam,
  validateJobInput,
  updateJob
);
router.delete("/:id", checkForTestUser, validateIdParam, deleteJob);

export { router as jobRouter };
