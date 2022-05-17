<h1 align="center">
💼 Job Crawler
</h1>
<p align="center">
Simple Job Crawler. Stack: MongoDB, Expressjs, React, NodeJS
</p>

<p align="center">
   <a href="https://github.com/senorMk/JobCrawler/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
   </a>
   <a href="https://circleci.com/gh/senorMk/JobCrawler">
      <img src="https://circleci.com/gh/senorMk/JobCrawler.svg?style=svg" />
   </a>
</p>

Job Crawler is a simple job aggregator that sources it's listings from the most visited job boards in Zambia.

## clone or download

```terminal
$ git clone https://github.com/senorMk/JobCrawler.git
$ npm i
```

## project structure

```terminal
LICENSE
package.json
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites

- [MongoDB](https://www.mongodb.com/try/download/community)
- [Node](https://nodejs.org/en/download/) ^16.15.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)

```terminal
$ cd client   // go to client folder
$ npm i       // npm install packages
$ npm start // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called build in the root level
$ npm run serve // this will run the files in build
```

## Server-side usage(PORT: 4000)

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm run dev // run it locally
$ npm run prod // run in production
```

## Standard

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## BUGs or comments

[Create new Issues](https://github.com/senorMk/JobCrawler/issues) (preferred)

Email Me: mkandawire15@gmail.com

## Author

[Penjani Mkandawire](mailto:mkandawire15@gmail.com)

### License

[MIT](https://github.com/senorMk/JobCrawler/blob/master/LICENSE)
