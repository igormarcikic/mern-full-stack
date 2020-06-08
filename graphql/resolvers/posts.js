const Post = require('../../models/Post');

const postResolvers = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch(err) {
                throw new Error(err)
            }
        },
        getPost: async (parent, { postId }, context, info) => {
            try {
                if (!postId.match(/^[0-9a-fA-F]{24}$/)) throw new Error('Invalid post ID');
                const post = await Post.findById(postId);
                if(post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            }catch(err) {
                throw new Error(err);
            }
        }
    }
};

module.exports = postResolvers;