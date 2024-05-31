const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');
const Movies = require('../models/movies.js');
const axios = require('axios')
let isSearch = false


router.get('/', (req, res) => {
    res.render('management/management.ejs')
})

router.get('/search/book', async (req, res) => {
    const booksResult = []
    const apiResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes?langRestrict=en&q=${req.query.search}&key=${process.env.SECRET_API_KEY}&maxResults=12`);
    apiResponse.data.items.forEach(element => {
        let booksApiSchema = {
            name: element.volumeInfo.title,
            year: element.volumeInfo.publishedDate,
            author: element.volumeInfo.authors,
            genre: element.volumeInfo.categories,
            description: element.volumeInfo.description,
            image: element.volumeInfo.imageLinks?.thumbnail,
        }
        booksResult.push(booksApiSchema)
    });
    isSearch = true;
    res.render('management/management.ejs', { booksResult, isSearch })
})

router.get('/search/movie', async (req, res) => {
    const moviesResult = []
    const apiResponse = await axios.get(`http://www.omdbapi.com/?apikey=d2d84e46&type=movie&s=${req.query.search}`);
    apiResponse.data.Search.forEach(element => {
        let movieApiSchema = {
            name: element.Title,
            year: element.Year,
            id: element.imdbID,
            image: element.Poster,
        }
        moviesResult.push(movieApiSchema)
    });
    isSearch = true;
    res.render('management/management.ejs', {moviesResult,isSearch })
})

router.post('/book', async (req, res) => {
    await Books.create({
        name: req.body.name,
        year: new Date(req.body.year).getFullYear(),
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        image: req.body.image,
    })
    res.redirect('/home')
})

router.delete('/book/:bookId', async (req, res) => {
    if(req.session.user.isAdmin){
        await User.updateMany({booksAdded:req.params.bookId},{ $pull: { booksAdded: req.params.bookId } })
        await Books.findByIdAndDelete(req.params.bookId)
    }
    res.redirect('/home')
})


router.post('/movie', async (req, res) => {
    const apiResponse = await axios.get(`http://www.omdbapi.com/?apikey=d2d84e46&i=${req.body.id}`);
    console.log(apiResponse)
    await Movies.create({
        name: apiResponse.data.Title,
        year: apiResponse.data.Year,
        author: apiResponse.data.Director,
        genre: apiResponse.data.Genre,
        description: apiResponse.data.Plot,
        image: apiResponse.data.Poster,
    })
    res.redirect('/home')
})

router.delete('/movie/:movieId', async (req, res) => {
    if(req.session.user.isAdmin){
        await User.updateMany({moviesAdded:req.params.movieId},{ $pull: { moviesAdded: req.params.movieId } })
        await Books.findByIdAndDelete(req.params.movieId)
    }
    res.redirect('/home')
})
module.exports = router