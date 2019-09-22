// Reinicia o servidor toda vez que salvar uma alteração no arquivo
// npm install -D nodemon
// npm run dev
 
const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// Iniciando o App
const app = express();
app.use(express.json());

//Iniciando o DB
mongoose.connect(
    'mongodb://192.168.99.100:27017/nodeapi', // usando o Docker Toolbox
    { useNewUrlParser: true, useUnifiedTopology: true }
);
// Sem o require-dir, terá que fazer um por um
//ex.: require('./src/models/Product');
requireDir('./src/models');

// Rotas
app.use('/api', require('./src/routes'));

app.listen(3001);

