import "express-async-errors"; // prevents server from crashing in case of async errors
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { jobRouter } from "./routes/jobRouter.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authRouter } from "./routes/authRouter.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5100;

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

// -------------------------- CRUD -----------------------------------

app.use("/api/v1/jobs", authenticateUser, jobRouter); // authenticate user in the entire job route
app.use("/api/v1/auth", authRouter);

// -------------------------------------------------------

// NOT FOUND MIDDLEWARE (checks all requests for a route that does not exist)
app.use("*", (req, res) => {
  res.status(404).json({ msg: "404 not found" });
});

// ERROR MIDDLEWARE (must be the last one)(valid routes but returns an error)
app.use(errorHandlerMiddleware);

// --------------------------- DATABASE AND PORT ----------------------------

try {
  await mongoose.connect(process.env.MONGO_URL, { dbName: "jobify_db" });
  console.log(`Connected to database successfully`);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
