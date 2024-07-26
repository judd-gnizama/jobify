import { NotFoundError } from "../errors/customErrors.js";
import jobModel from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
  console.log(req.user.userId);
  const jobs = await jobModel.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await jobModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const job = await jobModel.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const updatedJob = await jobModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // we want it to send the updated job that's why new: true

  res.status(StatusCodes.OK).json({ msg: "job updated", updatedJob });
};
export const deleteJob = async (req, res) => {
  const removedJob = await jobModel.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "job deleted", removedJob });
};
