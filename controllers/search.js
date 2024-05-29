const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');
const session = require('express-session');
const axios = require('axios')

router.get('/', (req,res) =>{
    res.render('search/search.ejs')
})

router.post('/', (req,res) =>{
    res.redirect('/search/results')
})

router.get('/results', (req,res) =>{
    res.render('search/results.ejs')
})


module.exports = router