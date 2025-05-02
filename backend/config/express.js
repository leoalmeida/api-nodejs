const express    = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const config = require('config')
const db = require('./db');

// Inicializando a aplicação Express
const app = express();

// Importando as rotas da aplicação relacionadas às tarefas
const resourceRoutes = require('../api/routes/resourceRoutes');
const statusRoutes = require('../api/routes/statusRoutes');
const userRoutes = require('../api/routes/userRoutes');

// Definindo variáveis que o servidor deverá usar
app.set('port', process.env.PORT || config.get('server.port'));
app.set('db_url', process.env.DATABASE_URL || config.get('server.db.url'));

db.connect(app.get('db_url'));

// Configurando as rotas disponibilizadas pela aplicação
app.use('/api/v1', resourceRoutes);
app.use('/api/v1', statusRoutes);
app.use('/api/v1', userRoutes);

app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
