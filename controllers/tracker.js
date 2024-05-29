const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');


router.get('/', async (req, res) => {
    try{
        const user = await User.findById(req.session.user.userId)
    const books = []
    for (const bookId of user.booksAdded) {
        const book = await Books.findById(bookId);
        books.push(book) 
    };
    res.render('tracker/tracker.ejs', {books, user})
}catch(err){
    console.error(err.message);
    req.session.message = err.message;
    res.redirect('/auth/sign-up',)
}
})


module.exports = router