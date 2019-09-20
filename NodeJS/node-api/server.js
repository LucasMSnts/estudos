// Reinicia o servidor toda vez que salvar uma alteração no arquivo
// npm install -D nodemon
// npm run dev
 
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Helo World!');
});

app.listen(3001);

