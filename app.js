const express = require('express');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const Job = require('./models/job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function () {
    console.log(`O Express está rodando na porta ${PORT}`);
});

// Body Parser

app.use(bodyParser.urlencoded({ extended: false }));

// Handle Bars

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Static Folder 

app.use(express.static(path.join(__dirname, "public")));

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
    let search = req.query.job;
    let query = '%'+search+'%';

    if (!search) {
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs
            })
        })
    } else {

        Job.findAll({
            where: {title: {[Op.like]: query}},
            order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs, search
            });
        })
    }
});

//Jobs Routes

app.use('/jobs', require('./routes/jobs'));