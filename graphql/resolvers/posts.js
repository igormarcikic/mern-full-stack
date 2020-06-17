const { AuthenticationError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');

const postResolvers = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (err) {
                throw new Error(err)
            }
        },
        getUserPosts: async (parent, props, context, info) => {
            const user = checkAuth(context);
            const posts = await Post.find();

            const authorPosts = posts.filter(post => post.username === user.username);

            return authorPosts;

        },
        getPost: async (parent, { postId }, context, info) => {
            try {
                if (!postId.match(/^[0-9a-fA-F]{24}$/)) throw new Error('Invalid post ID');
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        createPost: async (parent, { title, body }, context, info) => {
            const user = checkAuth(context);

            const newPost = new Post({
                title,
                body,
                user: user._id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();
            return post;
        },
        deletePost: async (parent, { postId }, context, info) => {
            const user = checkAuth(context);
            try {
                const post = await Post.findById(postId);
                if(post.username === user.username) {
                    const deletedPost = await post.delete();
                    return deletedPost;
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            }catch(err) {
                throw new Error(err)
            }
        }
    }
};

module.exports = postResolvers;