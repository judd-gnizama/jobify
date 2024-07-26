import express from "express";
import morgan from "morgan";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5100;

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  res.json({ message: "data received", data: req.body });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
