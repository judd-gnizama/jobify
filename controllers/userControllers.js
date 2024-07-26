import { StatusCodes } from "http-status-codes";
import userModel from "../models/userModel.js";
import jobModel from "../models/jobModel.js";

export const getCurrentUser = async (req, res) => {
  const user = await userModel.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
export const getApplicationStats = async (req, res) => {
  const n_users = await userModel.countDocuments();
  const n_jobs = await jobModel.countDocuments();

  res.status(StatusCodes.OK).json({ n_users, n_jobs });
};
export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await userModel.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: "updated user" });
};
