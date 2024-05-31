const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');
const Movies = require('../models/movies.js')
const session = require('express-session');
const axios = require('axios')
let isSearch = false

router.get('/', (req, res) => {
    
    try {
    res.render('search/search.ejs')
} catch (err) {
    req.session.message = err.message;
    res.redirect('/');
}
})

router.post('/', (req, res) => {
    try {
    res.redirect('/search/results')
} catch (err) {
    req.session.message = err.message;
    res.redirect('/');
}
})

router.get('/results/books', async (req, res) => {  
    try {  
    const bookResultList = await Books.find({
        $or:[
         {"name": { $regex: req.query.search, $options: 'i' }},
         {"serie": { $regex: req.query.search, $options: 'i' }},
         {"author": { $regex: req.query.search, $options: 'i' }},
         {"genre": { $regex: req.query.search, $options: 'i' }},
        ]})
    isSearch = true
    res.render('search/search.ejs', { bookResultList, isSearch })
} catch (err) {
    req.session.message = err.message;
    res.redirect('/');
}
})

router.get('/results/movies', async (req, res) => {  
    try {  
    const movieResultList = await Movies.find({
        $or:[
         {"name": { $regex: req.query.search, $options: 'i' }},
         {"author": { $regex: req.query.search, $options: 'i' }},
         {"genre": { $regex: req.query.search, $options: 'i' }},
        ]})
    isSearch = true
    res.render('search/search.ejs', { movieResultList, isSearch })
} catch (err) {
    req.session.message = err.message;
    res.redirect('/');
}
})



module.exports = router