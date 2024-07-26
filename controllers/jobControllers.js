import jobModel from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
  const jobs = await jobModel.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = await jobModel.create({ company, position });
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await jobModel.findById(id);
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id}` });
    return;
  }

  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await jobModel.findByIdAndUpdate(id, req.body, {
    new: true,
  }); // we want it to send the updated job that's why new: true
  if (!updatedJob) {
    res.status(404).json({ msg: `no job with id ${id}` });
    return;
  }

  res.status(StatusCodes.OK).json({ msg: "job updated", updatedJob });
};
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await jobModel.findByIdAndDelete(id);
  if (!removedJob) {
    res.status(404).json({ msg: `no job with id ${id}` });
    return;
  }
  res.status(StatusCodes.OK).json({ msg: "job deleted", removedJob });
};
