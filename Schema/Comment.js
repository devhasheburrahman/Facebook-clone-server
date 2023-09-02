const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    comment: {
        type: String
    }
})

const CommentModel = mongoose.model('comment', commentSchema);
module.exports = CommentModel;

 
