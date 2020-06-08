const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

require('dotenv').config();
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Apollo server constructor with three parameters - schema, resolvers and context(for request access)
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
});

// A function to connect to the MongoDB and launch the server
const connectToDb = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const serverAddress = await server.listen({ port: process.env.PORT});
    console.log(`Server is running at ${serverAddress.url}`)
};

connectToDb();