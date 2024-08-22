const express = require('express');
const app = express();
const db = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 3000;

app.listen(PORT, function () {
    console.log(`O Express está rodando na porta ${PORT}`);
});

// Body Parser

app.use(bodyParser.urlencoded({ extended: false }));

// DB Connection

db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso.");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao se conectar", err);
    })

// Routes
app.get('/', (req, res) => {
    res.send("Está funcionando");
});

//Jobs Routes

app.use('/jobs', require('./routes/jobs'));

