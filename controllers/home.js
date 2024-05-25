const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Books = require('../models/books.js');
const session = require('express-session');


router.get('/', async (req,res) =>{
    const books = await Books.find()
    res.render('home/home.ejs',{
        books,
    })
})

router.get('/:bookId', async (req,res) =>{
    // !try add error message canot find book
    const user = await User.findById(req.session.user.userId)
    const book = await Books.findById(req.params.bookId)
    res.render('show.ejs', {book,user})
})

router.post('/:bookId', async (req,res) =>{
    const user = await User.findById(req.session.user.userId)
    const bookExist = user.booksAdded.includes(req.params.bookId)
    if(!bookExist){
    await user.booksAdded.push(req.params.bookId)
    await user.save()
    res.send("lles, this work")
    }else{
        res.send("book already on the list")
    }
})

router.delete('/:bookId', async (req,res) =>{
    const user = await User.findById(req.session.user.userId)
    const index = await user.booksAdded.indexOf(req.params.bookId)
    await user.booksAdded.splice(index,1)
    await user.save()
    res.send(`we just delete ${req.params.bookId}`)
})



module.exports = router