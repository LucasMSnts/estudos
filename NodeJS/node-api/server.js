// Reinicia o servidor toda vez que salvar uma alteração no arquivo
// npm install -D nodemon
// npm run dev
 
const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// Iniciando o App
const app = express();

//Iniciando o DB
mongoose.connect(
    'mongodb://192.168.99.100:27017/nodeapi', // usando o Docker Toolbox
    { useNewUrlParser: true, useUnifiedTopology: true }
);
// Sem o require-dir, terá que fazer um por um
//ex.: require('./src/models/Product');
requireDir('./src/models');

const Product = mongoose.model('Product');

//Primeira rota
app.get('/', (req, res) => {
    Product.create({
        title: 'React Native',
        description: 'Build native apps with React',
        url: 'http://github.com/facebook/react-native'
    });
    
    return res.send('Helo World!');
});

app.listen(3001);

