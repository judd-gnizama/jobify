import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { body, param, validationResult } from "express-validator";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import jobModel from "../models/jobModel.js";
import userModel from "../models/userModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        // check if the first error starts with no job
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access");
        }
        throw new BadRequestError(errorMessages);
      }
      next(); // to make it go to the next middleware
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);

// id must match '/:id'
export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(value);
    if (!isIdValid) throw new BadRequestError("invalid MongoDB id");

    const job = await jobModel.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value}`);

    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    // check if the user is the owner
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("not authorized to access");
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid")
    .custom(async (email) => {
      const user = await userModel.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid"),
  body("password").notEmpty().withMessage("password is required"),
]);
