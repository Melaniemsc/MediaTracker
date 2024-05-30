const express = require('express');
const router = express.Router();
const Books = require('../models/books.js');


router.get('/', async (req, res) => {
    const reviews = []
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
            reviews.push(review)
        }
    })
    res.render('comunity/comunity.ejs',{reviews})
})

const formatDate = (dateTimeString) =>{
    const date = new Date(dateTimeString)
    return date.toLocaleString();
}

module.exports = router