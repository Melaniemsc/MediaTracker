const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');
const session = require('express-session');


router.get('/book/:bookId', async (req, res) => {
    const user = await User.findById(req.session.user.userId)
    const book = await Books.findById(req.params.bookId)

    let reviews= []
    for(const element of book.reviews){
        let reviewerObject = await User.findById(element.reviewer)
         review = {
             text: element.text,
             username:  reviewerObject.username,
             id: element._id,
             usernameId: reviewerObject._id.toString()
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
    res.redirect(`/tracker/book/${req.params.bookId}`)

})

router.get('/book/:bookId/reviews/:reviewId/edit', async(req,res) =>{
    const book = await Books.findById(req.params.bookId).populate("reviews.reviewer")
    const review = book.reviews.id(req.params.reviewId)
    res.render('editReview.ejs', { book, review });
});

router.put('/book/:bookId/reviews/:reviewId/edit', async (req, res) => {
    const book = await Books.findById(req.params.bookId).populate("reviews.reviewer")
    const review = book.reviews.id(req.params.reviewId)
    if (review && review.reviewer.equals(req.session.user.userId)) {
        review.text = req.body.textEdit;
        await book.save();
        res.redirect(`/tracker/book/${req.params.bookId}`);
    } else {
        res.redirect(`/tracker/book/${req.params.bookId}`);
    }
});

router.delete('/book/:bookId/reviews/:reviewId/edit',async (req, res) => {
    const book = await Books.findById(req.params.bookId).populate("reviews.reviewer")
    const review = book.reviews.id(req.params.reviewId) 

    if (review && review.reviewer.equals(req.session.user.userId)) { 
        book.reviews.pull(review._id)
        await book.save()
        res.redirect(`/tracker/book/${req.params.bookId}`);
    }
})

module.exports = router