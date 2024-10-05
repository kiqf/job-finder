const express = require('express');
const router = express.Router();
const Job = require('../models/job');

// Rota de Teste
router.get('/test', (req, res) => {
    res.send('Welcome to the Job Finder');
})

// Detalhe da Vaga

router.get('/view/:id', (req,res) => Job.findOne({
    where: {id: req.params.id}
}).then(job => {
    res.render('view', {
        job
    });
}).catch(err => console.log(err)));

//Form da rota de envio
router.get('/add', (req, res) => {
    res.render('add');
})
// Add job via POST

router.post('/add', (req, res) => {
    let {title, salary, company, description, email, new_job} = req.body;

    // Insert
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })

        .then(() => res.redirect('/'))
        .catch(err => console.log(err));

});

module.exports = router