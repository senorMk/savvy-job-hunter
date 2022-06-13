import Mongoose from "mongoose";
import logger from "../core/logger/app-logger.js";
import config from "../core/config/config.dev.js";
import JobsModel from "../models/jobs.model.js";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import CronJob from "cron";
import PQueue from "p-queue";

const scanQueue = new PQueue({ concurrency: 1 });
Mongoose.Promise = global.Promise;

const doScanJobs = async (site) => {
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
        await page.setUserAgent(config.userAgent);

        const jobListingItem = "job_listing";

        // Parsing
        const maxCrawlJobs = config.maxCrawlJobs;
        const jobsPerPage = config.jobsPerPage;
        const loops = maxCrawlJobs / jobsPerPage;

        logger.info("Starting crawl.");
        logger.info("Checking the most recent: " + maxCrawlJobs);
        logger.info("At a rate of: " + jobsPerPage);

        for (let i = 1; i <= loops; i++) {
          try {
            // Initial load
            let response = await page.goto(
              `${site}/jm-ajax/get_listings/?&per_page=${jobsPerPage}&page=${i}`,
              {
                waitUntil: "networkidle2",
              }
            );

            if (response.ok()) {
              let json = await response.json();
              let text = await response.text();

              let html = json.html;

              await page.setContent(html);

              let Received = await page.evaluate((jobListingItem) => {
                let Jobs = Array.from(
                  document.getElementsByClassName(jobListingItem)
                );

                let CleanArray = [];

                Jobs.forEach(async (job) => {
                  let link = job.querySelector("a").getAttribute("href");
                  let companyLogo = job
                    .querySelector("img")
                    .getAttribute("src");
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

                  if (jobType !== "Advert") {
                    CleanArray.push(new_job);
                  }
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
            } else {
              logger.info("Response not okay.");
              logger.info("Status: " + response.status());
              logger.info("Status text: " + response.statusText());
              console.log("Actual response: ", response);
            }
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

let Websites = ["https://gozambiajobs.com", "https://jobsearchzm.com"];

const scanJobs = new CronJob.CronJob(
  `*/${config.minsPerCrawl} * * * *`,
  async () => {
    Websites.forEach(async (site) => {
      await scanQueue.add(async () => await doScanJobs(site));
    });
  }
);

export default scanJobs;
