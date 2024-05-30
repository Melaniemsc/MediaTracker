const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');
const session = require('express-session');



router.get('/', async (req, res) => {
    const message = req.session.message
    let books = await Books.find()
    books = books.sort(()=>0.5-Math.random())
    const randomBooks = books.slice(0, 4);
    res.render('home/home.ejs', {
        books: randomBooks, message
    })
})

module.exports = router