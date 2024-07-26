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

const router = Router();

router.get("/", getAllJobs);
router.post("/", validateJobInput, createJob);
router.get("/:id", validateIdParam, getJob);
router.patch("/:id", validateIdParam, validateJobInput, updateJob);
router.delete("/:id", validateIdParam, deleteJob);

export { router as jobRouter };
