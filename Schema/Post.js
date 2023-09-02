const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    post: {
        type: String,
    },
    photo: {
        type: String
    },
    like: {
        type: Number,
        default: 1000,
    }


})

module.exports = mongoose.model('post', postSchema);