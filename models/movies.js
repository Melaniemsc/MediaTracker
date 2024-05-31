const mongoose = require ("mongoose");

const reviewSchema = new mongoose.Schema({
    text: { type: String, required: true },
    reviewer: { type: mongoose.Schema.ObjectId, required: true, ref: "User" }
}, {timestamps: true})

const moviesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    year: { type: Number, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    image: { type: String, required: false},
    reviews: [reviewSchema],
})


const Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;