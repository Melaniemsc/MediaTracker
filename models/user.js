const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    booksAdded: [{type: String}],
    moviesAdded: [{type: String}]
})

const User = mongoose.model("User", userSchema);

module.exports = User;