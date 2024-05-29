const express = require('express');
const router = express.Router();
const Books = require('../models/books.js');
const axios = require('axios')
let isSearch = false


router.get('/', (req, res) => {
    res.render('management/management.ejs')
})

router.get('/search', async (req, res) => {
    const booksResult = []
    const apiResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes?langRestrict=en&q=${req.query.search}&key=${process.env.SECRET_API_KEY}`);
    apiResponse.data.items.forEach(element => {
        let booksApiSchema = {
            name: element.volumeInfo.title,
            year: element.volumeInfo.publishedDate,
            author: element.volumeInfo.authors,
            genre: element.volumeInfo.categories,
        }
        booksResult.push(booksApiSchema)
    });
    isSearch = true;
    res.render('management/management.ejs', { booksResult, isSearch })
})

router.post('/book', async (req, res) => {
    await Books.create({
        name: req.body.name,
        year: new Date(req.body.year).getFullYear(),
        author: req.body.author,
        genre: req.body.genre,
    })
    res.redirect('/home')
})


module.exports = router