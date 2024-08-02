import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  showStats,
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

router.get("/stats", showStats); // placed it before /:id so that it does get interpreted as id

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
