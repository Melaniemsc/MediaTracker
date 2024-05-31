const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');
const Movies = require('../models/movies.js')
const session = require('express-session');
const axios = require('axios')
let isSearch = false

router.get('/', (req, res) => {
    res.render('search/search.ejs')
})

router.post('/', (req, res) => {
    res.redirect('/search/results')
})

router.get('/results/books', async (req, res) => {    
    const bookResultList = await Books.find({
        $or:[
         {"name": { $regex: req.query.search, $options: 'i' }},
         {"serie": { $regex: req.query.search, $options: 'i' }},
         {"author": { $regex: req.query.search, $options: 'i' }},
         {"genre": { $regex: req.query.search, $options: 'i' }},
        ]})
    isSearch = true
    res.render('search/search.ejs', { bookResultList, isSearch })
})

router.get('/results/movies', async (req, res) => {    
    const movieResultList = await Movies.find({
        $or:[
         {"name": { $regex: req.query.search, $options: 'i' }},
         {"author": { $regex: req.query.search, $options: 'i' }},
         {"genre": { $regex: req.query.search, $options: 'i' }},
        ]})
    isSearch = true
    res.render('search/search.ejs', { movieResultList, isSearch })
})



module.exports = router