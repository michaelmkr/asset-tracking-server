const logger = require('./utils/logger');
const app = require('./interfaces/http');

const port = 8080;

app.listen(port, () => {
  logger.info(`service listening on port ${port}!`);
});
