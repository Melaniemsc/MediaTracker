const mongoose = require ("mongoose");

// const reviewSchema = new mongoose.Schema({
//     text: { type: String, required: true },
//     reviewer: { type: mongoose.Schema.ObjectId, required: true, ref: "user" }
// }, {timestamps: true})

const booksSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serie: { type: String, required: false },
    number: { type: Number, required: false },
    year: { type: Number, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    // createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true},
    // reviews: [reviewSchema],
})

const Books = mongoose.model("Books", booksSchema);

module.exports = Books;