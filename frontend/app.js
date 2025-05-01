const express = require('express');
const app = express();

const path = __dirname + '/views/';

/* Routes */
const router = require('./router')

/* Middlewares */
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path));

const port = 8080;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})



