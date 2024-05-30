const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');
const session = require('express-session');
const axios = require('axios')
let isSearch = false

router.get('/', (req, res) => {
    res.render('search/search.ejs')
})

router.post('/', (req, res) => {
    res.redirect('/search/results')
})

router.get('/results', async (req, res) => {    
    const resultList = await Books.find({
        $or:[
         {"name": { $regex: req.query.search, $options: 'i' }},
         {"serie": { $regex: req.query.search, $options: 'i' }},
         {"author": { $regex: req.query.search, $options: 'i' }}
        ]})
    isSearch = true
    res.render('search/search.ejs', { resultList, isSearch })
})


module.exports = router