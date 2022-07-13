import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import logger from './core/logger/app-logger.js';
import morgan from 'morgan';
import config from './core/config/config.dev.js';
import jobs from './routes/jobs.route.js';
import connectToDb from './db/connect.js';
import scanJobs from './crawl/scan.js';
import parseJobs from './crawl/parse.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

// MongoDB
connectToDb();

// Cron Jobs

scanJobs.start();
parseJobs.start();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev', { stream: logger.stream }));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/api/v1/jobs', jobs);

// index route
app.get('*', (req, res) => res.sendFile(config.frontDir));

export default app;
