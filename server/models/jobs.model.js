import mongoose from "mongoose";
import logger from "../core/logger/app-logger.js";

const JobSchema = mongoose.Schema({
  link: String,
  companyLogo: String,
  companyLogoAlt: String,
  position: String,
  companyName: String,
  location: String,
  jobType: String,
  jobDescriptionText: String,
  jobDescriptionHtml: String,
  dateOpen: Date,
  dateClosed: Date,
  verified: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
});

let JobsModel = mongoose.model("Job", JobSchema);

JobsModel.getById = async (req, res) => {
  JobsModel.findById(req.params.jobId, function (err, job) {
    if (err) {
      res.status(500).send(err);
    }

    if (!job) {
      res.status(400).send("No job found!");
    }

    res.send(job);
  });
};

JobsModel.getAll = async (req, res) => {
  let pageNo = parseInt(req.query.pageNo);
  let size = parseInt(req.query.size);
  let query = {};

  if (pageNo < 0 || pageNo === 0) {
    response = {
      error: true,
      message: "invalid page number, should start with 1",
    };
    return res.json(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;

  let response = await JobsModel.countDocuments({}).then(async function (
    totalCount,
    error
  ) {
    let response = {};

    if (error) {
      response = { error: true, message: "Error counting documents data" };
      res.json(response);
    }

    JobsModel.find({}, {}, query, function (err, data) {
      let response = {};
      if (err) {
        response = { error: true, message: "Error fetching data" };
      } else {
        let totalPages = Math.ceil(totalCount / size);
        response = {
          error: false,
          message: data,
          pages: totalPages,
          count: totalCount,
        };
      }

      res.json(response);
    }).sort({ created: "desc" });
  });

  return response;
};

JobsModel.addJob = (jobToAdd) => {
  let newJob = new JobsModel();

  newJob.link = jobToAdd.link;
  newJob.companyLogo = jobToAdd.companyLogo;
  newJob.companyLogoAlt = jobToAdd.companyLogoAlt;
  newJob.position = jobToAdd.position;
  newJob.companyName = jobToAdd.companyName;
  newJob.location = jobToAdd.location;
  newJob.jobType = jobToAdd.jobType;
  newJob.dateOpen = jobToAdd.dateOpen;
  newJob.dateClosed = jobToAdd.dateClosed;
  newJob.verified = jobToAdd.verified;

  newJob.save(function (err) {
    if (err) {
      logger.error("Failed to save job: " + newJob.position);
      return;
    }
  });
};

JobsModel.removeJob = (jobToDelete) => {
  JobsModel.deleteOne(
    {
      link: jobToDelete.link,
      companyLogo: jobToDelete.companyLogo,
      companyLogoAlt: jobToDelete.companyLogoAlt,
      position: jobToDelete.position,
      companyName: jobToDelete.companyName,
      location: jobToDelete.location,
      jobType: jobToDelete.jobType,
      date: jobToDelete.date,
      verified: jobToDelete.verified,
    },
    function (err) {
      if (err) {
        logger.error("Failed to delete job: " + jobToDelete.position);
        return;
      }
    }
  );
};

export default JobsModel;
