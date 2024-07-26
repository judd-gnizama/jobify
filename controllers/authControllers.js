import { StatusCodes } from "http-status-codes";
import userModel from "../models/userModel.js";
import { USER_ROLES } from "../utils/constants.js";

export const registerUser = async (req, res) => {
  const isFirstAccount = (await userModel.countDocuments()) === 0;
  req.body.role = isFirstAccount ? USER_ROLES.ADMIN : USER_ROLES.USER;
  const user = await userModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};
export const loginUser = async (req, res) => {
  res.send("login");
};
