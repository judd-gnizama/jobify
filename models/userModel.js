import mongoose from "mongoose";
import { USER_ROLES } from "../utils/constants.js";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my-city",
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.USER,
  },
  avatar: String,
  avatarPublicId: String,
});

userSchema.methods.toJSON = function () {
  let obj = this.toObject(); // make it into js object
  delete obj.password;
  return obj;
};

export default mongoose.model("User", userSchema);
