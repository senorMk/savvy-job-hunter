import Job from "../models/jobs.model.js";
import logger from "../core/logger/app-logger.js";

const jobController = {};

jobController.getById = async (req, res) => {
  try {
    await Job.getById(req, res);
    logger.info("Sending individual job.");
  } catch (err) {
    logger.error("Error in getting jobs - " + err);
  }
};

jobController.getAll = async (req, res) => {
  try {
    await Job.getAll(req, res);
    logger.info("Sending all jobs.");
  } catch (err) {
    logger.error("Error in getting jobs - " + err);
    res.send("Got error in getAll");
  }
};

jobController.addJob = async (req, res) => {
  let jobToAdd = Job({
    name: req.body.name,
  });
  try {
    const savedJob = await Job.addJob(jobToAdd);
    logger.info("Adding job...");
    res.send("added: " + savedJob);
  } catch (err) {
    logger.error("Error in getting jobs - " + err);
    res.send("Got error in getAll");
  }
};

jobController.deleteJob = async (req, res) => {
  let jobName = req.body.name;
  try {
    const removedJob = await Job.removeJob(jobName);
    logger.info("Deleted Job - " + removedJob);
    res.send("Job successfully deleted");
  } catch (err) {
    logger.error("Failed to delete job - " + err);
    res.send("Delete failed..!");
  }
};

export default jobController;
