const { gql } = require('apollo-server');

const typeDefs = gql`
    type Post {
        id: ID!
        title: String!
        body: String!
        username: String!
        createdAt: String!
        comments: [Comment]!
    }
    type Comment {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type User {
        id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: String!): Post!
        login(username: String!, password: String!): User!
    }
    type Mutation {
        register(registerInput: RegisterInput!): User!
        createPost(title: String!, body: String!): Post!
        deletePost(postId: ID!): Post!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
    }
`;

module.exports = typeDefs;