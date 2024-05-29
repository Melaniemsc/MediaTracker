const mongoose = require ("mongoose");

const reviewSchema = new mongoose.Schema({
    text: { type: String, required: true },
    reviewer: { type: mongoose.Schema.ObjectId, required: true, ref: "User" }
}, {timestamps: true})

const booksSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serie: { type: String, required: false },
    number: { type: Number, required: false },
    year: { type: Number, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    image: { type: String, required: false},
    reviews: [reviewSchema],
})


const Books = mongoose.model("Books", booksSchema);

module.exports = Books;