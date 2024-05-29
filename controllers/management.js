const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');
const session = require('express-session');
const axios = require('axios')
const booksResult = []


router.get('/', (req,res) =>{
    res.render('management/management.ejs',{booksResult})
})

router.get('/search', async (req,res) =>{
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
    console.log(booksResult);
    // res.send(booksResult)
    res.render('management/management.ejs',{booksResult})
})


module.exports = router