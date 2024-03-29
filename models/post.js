const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        data : Buffer,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include the array of id of all comment in the post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Like'
        }
    ]
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;