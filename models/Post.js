const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    title: String,
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ]
});

const Post = model('Post', postSchema);

module.exports = Post;