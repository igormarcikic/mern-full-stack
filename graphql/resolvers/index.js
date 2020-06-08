const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentResolvers = require('./comments');

const resolvers = {
    Query: {
        ...postResolvers.Query,
        ...userResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    }
};

module.exports = resolvers;