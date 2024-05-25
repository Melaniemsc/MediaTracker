const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');


router.get('/', async (req, res) => {
    const user = await User.findById(req.session.user.userId)
    const books = []
    for (const bookId of user.booksAdded) {
        const book = await Books.findById(bookId);
        books.push(book)
    };
    books.forEach(book => {
        console.log(book.name);book.name
    })
    
    res.render('tracker/tracker.ejs', {books})
})





module.exports = router