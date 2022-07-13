import express from 'express';
import jobController from '../controllers/jobs.controller.js';
const router = express.Router();

router.get('/:jobId', (req, res) => {
  jobController.getById(req, res);
});

router.get('/', (req, res) => {
  jobController.getAll(req, res);
});

export default router;
