import { StatusCodes } from "http-status-codes";
import userModel from "../models/userModel.js";
import { USER_ROLES } from "../utils/constants.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const registerUser = async (req, res) => {
  const isFirstAccount = (await userModel.countDocuments()) === 0;
  req.body.role = isFirstAccount ? USER_ROLES.ADMIN : USER_ROLES.USER;

  req.body.password = await hashPassword(req.body.password);

  const user = await userModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const loginUser = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role }); // payload could be any. depends on project

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 3600 * 1000),
    secure: process.env.NODE_ENV === "production",
  });
  // 'token' can be any string name
  // add 1day

  res.status(StatusCodes.OK).json({ msg: "login successfully" });
};
