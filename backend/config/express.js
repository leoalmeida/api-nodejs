
const express    = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const config     = require('config');
const consign    = require('consign');
const db = require('./db');

module.exports = () => {
  const app = express();

  // Variáveis da aplicação
  app.set('port', process.env.PORT || config.get('server.port'));

  app.use(bodyParser.json());
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  //configuração dos endpoints
  consign({cwd: 'api'})
  .then('models')
  .then('controllers')
  .then('routes')
  .into(app);

  return app;
};
