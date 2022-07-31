import 'dotenv/config';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

let config = {};
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
config.isProduction = process.env.NODE_ENV === 'production';

const __dirname = dirname(fileURLToPath(import.meta.url));
config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbUser = process.env.dbUser;
config.dbHost = process.env.dbHost;
config.dbPass = process.env.dbPass;
config.dbPort = process.env.dbPort;
config.dbName = process.env.dbName;
config.dbNameDebug = process.env.dbNameDebug;
config.dbConnectUrl = config.isProduction
  ? `mongodb+srv://${config.dbUser}:${config.dbPass}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`
  : `mongodb+srv://${config.dbUser}:${config.dbPass}@${config.dbHost}/${config.dbNameDebug}?retryWrites=true&w=majority`;
config.serverPort = process.env.PORT;
config.maxCrawlJobs = process.env.MAX_CRAWL_JOBS || 10;
config.jobsPerPage = process.env.JOBS_PER_PAGE || 10;
config.minsPerCrawl = process.env.MINS_PER_CRAWL || 10;
config.crawlSite = process.env.CRAWL_SITE;
config.frontDir = path.resolve(
  path.join(__dirname, '../../../client/build/index.html')
);

export default config;
