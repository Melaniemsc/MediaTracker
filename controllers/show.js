const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');
const Movie = require('../models/movies.js')
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

    res.render('show-book.ejs', { book, user,reviews })

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









router.get('/movie/:movieId', async (req, res) => {
    const user = await User.findById(req.session.user.userId)
    const movie = await Movie.findById(req.params.movieId)

    let reviews= []
    for(const element of movie.reviews){
        let reviewerObject = await User.findById(element.reviewer)
         review = {
             text: element.text,
             username:  reviewerObject.username,
             id: element._id,
             usernameId: reviewerObject._id.toString()
         }
         reviews.push(review)
    }

    res.render('show-movie.ejs', { movie, user,reviews })

})

router.post('/movie/:movieId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user.userId)
        await user.moviesAdded.push(req.params.movieId)
        await user.save()
        req.session.message = "Movie successfully added"
        res.redirect('/tracker')
    } catch (err) {
        console.log(err.message);
        req.session.message = err.message;
        res.redirect('/home');
    }
})

router.delete('/movie/:movieId', async (req, res) => {
    try {
    const user = await User.findById(req.session.user.userId)
    const index = await user.moviesAdded.indexOf(req.params.movieId)
    await user.moviesAdded.splice(index, 1)
    await user.save()
    req.session.message = "Movie successfully deleted"
    res.redirect('/tracker')
} catch (err) {
    console.log(err.message);
    req.session.message = err.message;
    res.redirect('/home');
}
})

router.post('/movie/:movieId/reviews', async (req, res) => {
    const movie = await Movies.findById(req.params.movieId).populate("reviews.reviewer")
    req.body.reviewer = req.session.user.userId
    movie.reviews.push(req.body)
    await movie.save()
    res.redirect(`/tracker/movie/${req.params.movieId}`)

})

router.get('/movie/:movieId/reviews/:reviewId/edit', async(req,res) =>{
    const movie = await Movies.findById(req.params.movieId).populate("reviews.reviewer")
    const review = movie.reviews.id(req.params.reviewId)
    res.render('editReview.ejs', { movie, review });
});

router.put('/movie/:movieId/reviews/:reviewId/edit', async (req, res) => {
    const movie = await Movies.findById(req.params.movieId).populate("reviews.reviewer")
    const review = movie.reviews.id(req.params.reviewId)
    if (review && review.reviewer.equals(req.session.user.userId)) {
        review.text = req.body.textEdit;
        await movie.save();
        res.redirect(`/tracker/movie/${req.params.movieId}`);
    } else {
        res.redirect(`/tracker/movie/${req.params.movieId}`);
    }
});

router.delete('/movie/:movieId/reviews/:reviewId/edit',async (req, res) => {
    const movie = await Movies.findById(req.params.movieId).populate("reviews.reviewer")
    const review = movie.reviews.id(req.params.reviewId) 

    if (review && review.reviewer.equals(req.session.user.userId)) { 
        movie.reviews.pull(review._id)
        await movie.save()
        res.redirect(`/tracker/movie/${req.params.movieId}`);
    }
})

module.exports = router