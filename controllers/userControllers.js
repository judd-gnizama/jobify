import { StatusCodes } from "http-status-codes";
import userModel from "../models/userModel.js";
import jobModel from "../models/jobModel.js";
import cloudinary from "cloudinary";
import { formatImage } from "../middlewares/multerMiddleware.js";

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
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await userModel.findByIdAndUpdate(
    req.user.userId,
    newUser
  );

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "updated user" });
};
