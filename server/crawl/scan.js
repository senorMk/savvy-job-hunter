import Mongoose from "mongoose";
import logger from "../core/logger/app-logger.js";
import JobsModel from "../models/jobs.model.js";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import CronJob from "cron";

Mongoose.Promise = global.Promise;

const doScanJobs = async () => {
  try {
    puppeteer.use(StealthPlugin());

    puppeteer
      .launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--log-level=1"],
      })
      .then(async (browser) => {
        logger.info("Crawling jobs...");

        const page = (await browser.pages())[0];

        await page.setJavaScriptEnabled(true);
        await page.setDefaultNavigationTimeout(0);
        await page.setUserAgent(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36"
        );

        const jobListingItem = "job_listing";

        // Parsing
        const maxCrawlJobs = 10;
        const jobsPerPage = 10;
        const loops = maxCrawlJobs / jobsPerPage;

        logger.info("Starting crawl.");
        logger.info("Checking the most recent: " + maxCrawlJobs);
        logger.info("At a rate of: " + jobsPerPage);

        for (let i = 1; i <= loops; i++) {
          try {
            // Initial load
            let response = await page.goto(
              `https://gozambiajobs.com/jm-ajax/get_listings/?&per_page=${jobsPerPage}&page=${i}`,
              {
                waitUntil: "networkidle2",
              }
            );

            let json = await response.json();

            let html = json.html;

            await page.setContent(html);

            let Received = await page.evaluate((jobListingItem) => {
              let Jobs = Array.from(
                document.getElementsByClassName(jobListingItem)
              );

              let CleanArray = [];

              Jobs.forEach(async (job) => {
                let link = job.querySelector("a").getAttribute("href");
                let companyLogo = job.querySelector("img").getAttribute("src");
                let companyLogoAlt = job
                  .querySelector("img")
                  .getAttribute("alt");
                let position = job
                  .querySelector("div.position > h3")
                  .innerHTML.replace(/&amp;/g, "&");
                let companyName = job.querySelector(
                  "div.position > div.company > strong"
                ).innerHTML;
                let location = job.querySelector("div.location").innerText;
                let jobType = job.querySelector(
                  "ul.meta > li.job-type"
                ).innerText;
                let dateOpen = job
                  .querySelector("ul.meta > li.date > time")
                  .getAttribute("datetime");
                let verified = false;

                let new_job = {
                  link,
                  companyLogo,
                  companyLogoAlt,
                  companyName,
                  position,
                  location,
                  jobType,
                  dateOpen,
                  verified,
                };

                CleanArray.push(new_job);
              });

              return CleanArray;
            }, jobListingItem);

            Received.forEach((job) => {
              // Lookup in database
              JobsModel.findOne(
                {
                  link: job.link,
                  companyName: job.companyName,
                  position: job.position,
                  date: Date.parse(job.date),
                },
                async function (err, job_res) {
                  if (!job_res) {
                    JobsModel.addJob(job);
                  }
                }
              );
            });
          } catch (error) {
            console.log(error);
            logger.error(error);
          }
        }

        await browser.close();

        logger.info("Crawl session done.");
      });
  } catch (err) {
    logger.error(err);
  }
};

const scanJobs = new CronJob.CronJob("*/10 * * * *", async () => {
  await doScanJobs();
});

export default scanJobs;
