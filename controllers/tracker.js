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





module.exports = router