const express = require('express');
const router = express.Router();
// const User = require('../models/user.js');
// const Books = require('../models/books.js');


router.get('/',(req,res) =>{
    res.render('tracker/tracker.ejs')
})





module.exports = router