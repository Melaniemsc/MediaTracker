const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');
const axios = require('axios')
let isSearch = false


router.get('/', (req, res) => {
    res.render('management/management.ejs')
})

router.get('/search', async (req, res) => {
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

module.exports = router