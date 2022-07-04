import Mongoose from 'mongoose';
import logger from '../core/logger/app-logger.js';
import config from '../core/config/config.dev.js';
import JobsModel from '../models/jobs.model.js';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import CronJob from 'cron';

Mongoose.Promise = global.Promise;

const doParseJobs = async () => {
  try {
    logger.info('Processing job.');

    puppeteer.use(StealthPlugin());

    let res = puppeteer
      .launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--log-level=1'],
      })
      .then(async (browser) => {
        const page = await browser.newPage();

        await page.setJavaScriptEnabled(true);
        await page.setDefaultNavigationTimeout(0);
        await page.setUserAgent(
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36'
        );

        logger.info('Searching db.');

        // Lookup in database
        let pageNo = 1;
        let size = 100;
        let query = {};
        query.skip = size * (pageNo - 1);
        query.limit = size;

        await JobsModel.find({ verified: false }, {}, query).then(
          async function (found_jobs, err) {
            if (err) {
              return;
            }

            let size = found_jobs.length;

            for (let i = 0; i < size; i++) {
              let found_job = found_jobs[i];

              if (err || !found_job) {
                return;
              }

              if (found_job.verified) {
                logger.error('Already verified job: ' + err);
                return;
              }

              if (found_job) {
                const jobDescriptionItem = 'div.job_description';

                await page.goto(found_job.link, {
                  waitUntil: 'networkidle2',
                });

                logger.info('Querying.');

                let Description = await page.evaluate((jobDescriptionItem) => {
                  let Response = {};

                  try {
                    Response.Text =
                      document.querySelector(jobDescriptionItem).innerText;
                    Response.Html =
                      document.querySelector(jobDescriptionItem).innerHTML;
                  } catch (err) {
                    Response.Text = '';
                    Response.Html = '';
                    console.log('Error: ', err);
                    return Response;
                  }

                  return Response;
                }, jobDescriptionItem);

                if (Description.Text && Description.Html) {
                  logger.info('Updating job: ' + found_job.position);

                  JobsModel.updateOne(
                    { _id: found_job._id },
                    {
                      $set: {
                        jobDescriptionText: Description.Text,
                        jobDescriptionHtml: Description.Html,
                        verified: true,
                      },
                    },
                    { upsert: true },
                    function (err) {
                      if (err) {
                        logger.error(
                          'Failed to update job: ' + found_job.position
                        );
                        return;
                      }
                    }
                  );
                } else {
                  logger.info('Invalid description.');
                }
              } else {
                logger.info('Could not find any jobs without a description.');
              }
            }
          }
        );

        await browser.close();

        logger.info('Done processing this loop.');
      });
  } catch (err) {
    logger.error(err);
  }
};

const parseJobs = new CronJob.CronJob(
  `*/${config.minsPerCrawl} * * * *`,
  async () => {
    await doParseJobs();
  }
);

export default parseJobs;
