import mongoose from "mongoose";
import { readFile } from "fs/promises";
import userModel from "./models/userModel.js";
import jobModel from "./models/jobModel.js";
import dotenv from "dotenv";
dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URL, { dbName: "jobify_db" });
  const user = await userModel.findOne({ email: "john@gmail.com" });
  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await jobModel.deleteMany({ createdBy: user._id });
  await jobModel.create(jobs);
  console.log("Success!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
