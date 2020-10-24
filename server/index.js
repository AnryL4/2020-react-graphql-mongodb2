const { ApolloServer, PubSub } = require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = require('./types/typeDefs.js');
const mongoose = require('mongoose');

const pubSub = new PubSub();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req, pubSub }),
});

mongoose
	.connect(
		'mongodb+srv://user:pass123@cluster0.1frba.mongodb.net/GraphQLTesting?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
	)
	.then(() => {
		console.log('database connected');
		return server.listen();
	})
	.then((res) => {
		console.log(`Server is running at ${res.url}`);
	})
	.catch((err) => console.log(err));
