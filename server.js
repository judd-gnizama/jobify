import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5100;

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

// -------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  res.json({ message: "data received", data: req.body });
});

// GET ALL JOBS
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

// CREATE JOB
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    res.status(400).json({ msg: "please provide company and position" });
    return;
  }

  const id = nanoid(10); // database usually does this one
  const job = { id, company, position };
  jobs.push(job);
  res.status(200).json({ job });
});

// GET A JOB
app.get("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id}` });
    return;
  }

  res.status(200).json({ job });
});

// EDIT JOB
app.patch("/api/v1/jobs/:id", (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    res.status(400).json({ msg: "please provide company and position" });
    return;
  }

  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id}` });
    return;
  }

  job.company = company;
  job.position = position;

  res.status(200).json({ msg: "job updated", job });
});

// DELETE JOB
app.delete("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id}` });
    return;
  }

  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ msg: "job removed" });
});

// -------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
