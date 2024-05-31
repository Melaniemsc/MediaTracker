require('dotenv').config();
const serverless = require('serverless-http')
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');
const path = require("path");
const MongoStore = require("connect-mongo");


const authController = require('../../controllers/auth.js')
const homeController = require('../../controllers/home.js')
const trackerController = require('../../controllers/tracker.js')
const searchController = require('../../controllers/search.js')
const managementController = require('../../controllers/management.js')
const comunityController = require('../../controllers/comunity.js')
const showController = require('../../controllers/show.js')





const app = express();

mongoose.connection.on("connected", ()=>{
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(
  session({
    secret:process.env.SECRET_PASSWORD,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:process.env.MONGODB_URI,
    })
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use((req, res, next) => {
  if (req.session.message) {
    res.locals.message = req.session.message;
    req.session.message = null;
  }
  next();
});


app.use(express.static("public"));

app.use('/auth', authController);
app.use('/home', homeController);
app.use('/tracker', trackerController);
app.use('/search', searchController);
app.use('/management', managementController);
app.use('/comunity', comunityController);
app.use('/tracker', showController);



app.get("/", (req,res) =>{
  if(req.session.user){
    res.redirect('/home')
  }
  res.render("welcome.ejs")
});

async function connectToDb() {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  
  connectToDb()

module.exports.handler = serverless(app)