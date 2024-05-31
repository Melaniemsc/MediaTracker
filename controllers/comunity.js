const express = require('express');
const router = express.Router();
const Books = require('../models/books.js');
const Movies = require('../models/movies.js');


router.get('/', async (req, res) => {
    const bookReviews = []
    const books = await Books.find({}).sort([['reviews.createdAt', -1]]).limit(5);
    books.forEach(book => {
        if (book.reviews.length > 0) {
            const latestReview = book.reviews.reduce(function (a, b) {
                return a < b ? a : b;
            });
            const review = {
                book: book.name,
                bookId: book.id,
                latestReview: latestReview,
                reviewTime: formatDate(latestReview.createdAt),
            }
            bookReviews.push(review)
        }
    })

    const movieReviews = []
    const movies = await Movies.find({}).sort([['reviews.createdAt', -1]]).limit(5);
    movies.forEach(movie => {
        if (movie.reviews.length > 0) {
            const latestReview = movie.reviews.reduce(function (a, b) {
                return a < b ? a : b;
            });
            const review = {
                movie: movie.name,
                movieId: movie.id,
                latestReview: latestReview,
                reviewTime: formatDate(latestReview.createdAt),
            }
            movieReviews.push(review)
        }
    })
    res.render('comunity/comunity.ejs',{bookReviews, movieReviews})
})

const formatDate = (dateTimeString) =>{
    const date = new Date(dateTimeString)
    return date.toLocaleString();
}

module.exports = router