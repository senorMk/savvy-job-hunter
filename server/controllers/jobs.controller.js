import Job from '../models/jobs.model.js';
import logger from '../core/logger/app-logger.js';

const jobController = {};

jobController.getById = async (req, res) => {
  try {
    await Job.getById(req, res);
    logger.info('Sending individual job.');
  } catch (err) {
    logger.error('Error in getting jobs - ' + err);
  }
};

jobController.getAll = async (req, res) => {
  try {
    await Job.getAll(req, res);
    logger.info('Sending all jobs.');
  } catch (err) {
    logger.error('Error in getting jobs - ' + err);
    res.send('Got error in getAll');
  }
};

export default jobController;
