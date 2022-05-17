import Mongoose from "mongoose";
import logger from "../core/logger/app-logger.js";
import config from "../core/config/config.dev.js";

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
  try {
    await Mongoose.connect(config.dbConnectUrl);
    logger.info("Connected to MongoDB !");
  } catch (err) {
    logger.error("Could not connect to MongoDB !");
  }
};

export default connectToDb;
