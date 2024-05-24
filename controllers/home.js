const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');


router.get('/', async (req,res) =>{
    const books = await Books.find()
    res.render('home/home.ejs',{
        books,
    })
})

router.get('/:bookId', async (req,res) =>{
    const book = await Books.findById(req.params.bookId)
    res.render('show.ejs', {book})
})



module.exports = router