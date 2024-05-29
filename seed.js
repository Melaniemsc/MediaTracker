const mongoose = require('mongoose');
require('dotenv').config();

const Books = require('./models/books.js');


async function seed() {
    console.log('Seeding has Begun!');
    mongoose.connect(process.env.MONGODB_URI)
    console.log('Connection successful');


    const newBook = await Books.create({
       
        name: "The Lightning Thief",
        serie: "Percy Jackson & the Olympians",
        number: 1,
        year: 2005,
        author: "Rick Riordan",
        genre: "Fantasy",
        image: "https://m.media-amazon.com/images/I/91WN6a6F3RL._AC_UF1000,1000_QL80_.jpgzhttps://m.media-amazon.com/images/I/91zkxjjK1bL._AC_UF1000,1000_QL80_.jpg"

    })
    console.log(newBook);
    mongoose.disconnect()
}

seed()