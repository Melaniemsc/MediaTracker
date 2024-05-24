require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');
const path = require("path");
const MongoStore = require("connect-mongo");

const authController = require('./controllers/auth.js')


const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;


mongoose.connect(process.env.MONGODB_URI);
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


app.use(express.static(path.join(__dirname,"public")))

app.use('/auth', authController)

app.get("/", (req,res) =>{
  res.render("welcome.ejs")
});




app.listen(port, () =>{
    console.log("Listening on port ", port);
})