import mongoose from 'mongoose';
import logger from '../core/logger/app-logger.js';

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

let JobsModel = mongoose.model('Job', JobSchema);

JobsModel.getById = async (req, res) => {
  try {
    let job = await JobsModel.findById(req.params.jobId);

    res.status(200).json({ message: 'Job found!', data: job, success: true });
  } catch (err) {
    logger.error('Failed to get job: ' + req.params.jobId);
    return res
      .status(500)
      .json({ message: 'Failed to get job', success: false });
  }
};

JobsModel.getAll = async (req, res) => {
  let pageNo = parseInt(req.query.pageNo);
  let size = parseInt(req.query.size);
  let position = req.query.position;
  let companyName = req.query.companyName;
  let location = req.query.location;
  let query = {};
  let filter = { verified: true };

  if (position) {
    filter.position = { $regex: position };
  }

  if (companyName) {
    filter.companyName = companyName;
  }

  if (location) {
    filter.location = location;
  }

  if (pageNo < 0 || pageNo === 0) {
    logger.error('Received invalid page number: ' + pageNo);
    return res.status(400).json({
      message: 'invalid page number, should start with 1',
      success: false,
    });
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;

  try {
    let totalCount = await JobsModel.countDocuments(filter).exec();
    let jobs = await JobsModel.find(filter, {}, query)
      .sort({ dateOpen: 'desc' })
      .exec();

    let totalPages = Math.ceil(totalCount / size);

    return res.status(200).json({
      message: 'Jobs found!',
      pages: totalPages,
      data: jobs,
      count: totalCount,
      success: true,
    });
  } catch (error) {
    logger.error('Error counting & finding documents: ' + error);
    return res.json({
      message: 'Error counting & finding documents',
      success: false,
    });
  }
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
      logger.error('Failed to save job: ' + newJob.position);
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
        logger.error('Failed to delete job: ' + jobToDelete.position);
        return;
      }
    }
  );
};

export default JobsModel;
