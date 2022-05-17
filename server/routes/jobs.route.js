import express from "express";
import jobController from "../controllers/jobs.controller.js";
const router = express.Router();

router.get("/get/:jobId", (req, res) => {
  jobController.getById(req, res);
});

router.get("/all", (req, res) => {
  jobController.getAll(req, res);
});

router.post("/addjob", (req, res) => {
  jobController.addJob(req, res);
});

router.delete("/deletejob", (req, res) => {
  jobController.deleteJob(req, res);
});

export default router;
