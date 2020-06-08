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
    }
    type Mutation {
        register(registerInput: RegisterInput!): User!
    }
`;

module.exports = typeDefs;