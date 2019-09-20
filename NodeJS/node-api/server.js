// Reiniciar o servidor toda vez que salvar uma alteração no arquivo
// npm install -D nodemon
 
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Helo World!');
});

app.listen(3001);

