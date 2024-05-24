const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/user.js');

router.get('/sign-up', (req,res) =>{
    if(req.session.user){
        // !redirect a home page when created
        res.send('you already logged in')
    }
    res.render('auth/sign-up.ejs');

});

router.post('/sign-up', async (req,res) =>{
    // !try{
    const userInDatabase =  await User.findOne({username: req.body.username})
    if(userInDatabase){
        // !add a error message duplicated username
        return res.send("This username already exist. Try again")
    }

    if (req.body.password!== req.body.confirmPassword){
        // !add a error message password dont match
        return res.send("password needs to match");
    }
    const hashedPassword = bcrypt.hashSync(req.body.password,10);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);

    req.session.user={
        username: user.username,
        userId:user._id
    }
    req.session.save(()=>{
        res.redirect('/')
    })

})

router.get('/sign-in',(req,res) =>{
    res.render('auth/sign-in.ejs');
})
router.get

router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router