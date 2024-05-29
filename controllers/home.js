const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');
const session = require('express-session');



router.get('/', async (req, res) => {
    const message = req.session.message
    const books = await Books.find()
    res.render('home/home.ejs', {
        books, message
    })
})

router.get('/book/:bookId', async (req, res) => {
    const user = await User.findById(req.session.user.userId)
    const book = await Books.findById(req.params.bookId)

    let reviews= []
    for(const element of book.reviews){
        let reviewerObject = await User.findById(element.reviewer)
         review = {
             text: element.text,
             username:  reviewerObject.username,
         }
         reviews.push(review)
    }

    res.render('show.ejs', { book, user,reviews })

})

router.post('/book/:bookId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user.userId)
        await user.booksAdded.push(req.params.bookId)
        await user.save()
        req.session.message = "Book successfully added"
        res.redirect('/tracker')
    } catch (err) {
        console.log(err.message);
        req.session.message = err.message;
        res.redirect('/home');
    }
})

router.delete('/book/:bookId', async (req, res) => {
    try {
    const user = await User.findById(req.session.user.userId)
    const index = await user.booksAdded.indexOf(req.params.bookId)
    await user.booksAdded.splice(index, 1)
    await user.save()
    req.session.message = "Book successfully deleted"
    res.redirect('/tracker')
} catch (err) {
    console.log(err.message);
    req.session.message = err.message;
    res.redirect('/home');
}
})

router.post('/book/:bookId/reviews', async (req, res) => {
    const book = await Books.findById(req.params.bookId).populate("reviews.reviewer")
    req.body.reviewer = req.session.user.userId
    book.reviews.push(req.body)
    await book.save()
    res.redirect(`/home/book/${req.params.bookId}`)

})

router.put('/book/:bookId/reviews', async (req,res) =>{
    const book = await Books.findById(req.params.bookId).populate("reviews.reviewer")
    req.body.reviewer = req.session.user.userId
    book.reviews.push(req.body)
    await book.save()
    res.redirect(`/home/book/${req.params.bookId}`)
})

module.exports = router