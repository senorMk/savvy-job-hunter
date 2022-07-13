import app from './app.js';
import config from './core/config/config.dev.js';
import logger from './core/logger/app-logger.js';

const port = config.serverPort;

app.listen(port, () => {
  logger.info('Server started on port - ' + port);
});
