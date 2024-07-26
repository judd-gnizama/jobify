import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { body, param, validationResult } from "express-validator";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import jobModel from "../models/jobModel.js";

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
  param("id").custom(async (value) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(value);
    if (!isIdValid) throw new BadRequestError("invalid MongoDB id");

    const job = await jobModel.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value}`);
  }),
]);
