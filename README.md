<h1 align="center">
💼 Savvy Job Hunter
</h1>
<p align="center">
Stack: MongoDB, Expressjs, React, NodeJS
</p>

<p align="center">
   <a href="https://github.com/senorMk/savvy-job-hunter/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
   </a>
   <a href="https://circleci.com/gh/senorMk/savvy-job-hunter">
      <img src="https://circleci.com/gh/senorMk/savvy-job-hunter.svg?style=svg" />
   </a>
</p>

Savvy Job Hunter is a more than just a simple job aggregator.

It sources it's listings from job boards that use the free [WP Job Manager](https://wordpress.org/plugins/wp-job-manager/) plugin and allows you to gain additional insight on any job listing.

## Clone

```terminal
$ git clone https://github.com/senorMk/JobCrawler.git
```

## Project Structure

```terminal
LICENSE
package.json
server/
client/
   package.json
...
```

## Prerequisites

- [MongoDB](https://www.mongodb.com/try/download/community)
- [Node](https://nodejs.org/en/download/) ^16.15.0
- [npm](https://nodejs.org/en/download/package-manager/)

Notice, the client and server run concurrently thanks to the [concurrently](https://www.npmjs.com/package/concurrently) npm package.

## Development

To run in development mode, execute the following commands at the root level folder:

```terminal
$ npm install
$ npm run install-client // install the client
$ npm run dev       // run the react development server and nodemon concurrently
```

## Production

Suggestions: to run in production mode, firstly create a .env file at the root level and specify the following:

- Database credentials: dbUser, dbHost, dbPass, dbPort, dbName
- Server listening port: PORT
- Maximum jobs to crawl per round: MAX_CRAWL_JOBS
- Maximum jobs to request per page: JOBS_PER_PAGE
- Duration between crawls: MINS_PER_CRAWL

Execute the following commands at the root level folder(ideally you could also use something like pm2 or forver for the last command):

```terminal
$ npm install
$ npm run install-client && npm run build // install the client and build it for production
$ npm run start // start the production node instance
```

## Issues

[Create new Issues](https://github.com/senorMk/JobCrawler/issues) (preferred)

## Author

[Penjani Mkandawire](mailto:mkandawire15@gmail.com)

### License

[MIT](https://github.com/senorMk/JobCrawler/blob/master/LICENSE)
