const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    booksAdded: [{type: mongoose.Schema.ObjectId, ref: 'Book'}]
})

const User = mongoose.model("User", userSchema);

module.exports = User;