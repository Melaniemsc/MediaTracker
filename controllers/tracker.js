const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');
const Movies = require('../models/movies.js');


router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user.userId)
        let books = []
        for (const bookId of user.booksAdded) {
            const book = await Books.findById(bookId);
            books.push(book)
        };
        books = books.sort(() => 0.5 - Math.random())
        const randomBooks = books.slice(0, 4);

        let movies = []
        for (const movieId of user.moviesAdded) {
            const movie = await Movies.findById(movieId);
            movies.push(movie)
        };

        movies = movies.sort(() => 0.5 - Math.random())
        const randomMovies = movies.slice(0, 4);
        res.render('tracker/tracker.ejs', {
            movies: randomMovies,
            books: randomBooks,
            user
        })
    } catch (err) {
        console.error(err.message);
        req.session.message = err.message;
        res.redirect('/auth/sign-up',)
    }
})

router.get('/books', async (req, res) => {
    try {
        const user = await User.findById(req.session.user.userId)
        const books = []
        for (const bookId of user.booksAdded) {
            const book = await Books.findById(bookId);
            books.push(book)
        };
        res.render('tracker/books-tracker.ejs', { books, user })
    } catch (err) {
        console.error(err.message);
        req.session.message = err.message;
        res.redirect('/auth/sign-up',)
    }
})






router.get('/movies', async (req, res) => {
    try {
        const movies = []
        for (const movieId of user.moviesAdded) {
            const movie = await Movies.findById(movieId);
            movies.push(movie)
        };
        res.render('tracker/tracker.ejs', {
            movies: randomMovies,
            books: randomBooks,
            user
        })
    } catch (err) {
        console.error(err.message);
        req.session.message = err.message;
        res.redirect('/auth/sign-up',)
    }
})

module.exports = router