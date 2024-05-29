const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/user.js');

router.get('/sign-up', (req, res) => {
    if (req.session.user) {
        return res.redirect('/home')
    }
    res.render('auth/sign-up.ejs');

});

router.post('/sign-up', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username })
        if (userInDatabase) {
            req.session.message = "This username already exist. Try again";
            return res.redirect("/auth/sign-up")
        }

        if (req.body.password !== req.body.confirmPassword) {
            req.session.message = "Password needs to match. Try again";
            return res.redirect("/auth/sign-up")
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

        const user = await User.create(req.body);

        req.session.user = {
            username: user.username,
            userId: user._id
        }
        req.session.save(() => {
            res.redirect('/home')
        })
    } catch (err) {
        console.log(err.message);
        req.session.message = err.message;
        res.redirect('/auth/sign-up', { message: err.message });
    }
})

router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs');
})

router.post('/sign-in', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password);
        console.log(validPassword);
        if (!userInDatabase || !validPassword) {
            req.session.message = 'Loggin failed. Please try again'
            return res.redirect("/auth/sign-in")
        }
        req.session.user = {
            username: userInDatabase.username,
            userId: userInDatabase._id,
            isAdmin: userInDatabase.isAdmin,
        }
        req.session.save(() => {
            res.redirect('/home')
        })
        
    } catch (err) {
        console.log(err.message);
        req.session.message = err.message;
        res.redirect('/auth/sign-in', { message: err.message });
    }
})

router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router