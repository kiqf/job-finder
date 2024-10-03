const express = require('express');
const router = express.Router();
const Job = require('../models/job');

router.get('/test', (req, res) => {
    res.send('Welcome to the Job Finder');
})

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