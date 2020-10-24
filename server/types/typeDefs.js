const { gql } = require('apollo-server');

module.exports = gql`
	type Movie {
		id: ID!
		title: String
		date: Int
		username: User!
	}
	type Post {
		id: ID!
		title: String!
		body: String!
		date: String
		user: User!
	}
	type User {
		id: ID!
		username: String!
		token: String!
		email: String!
	}
	type Query {
		getMovies: [Movie]
		getMovie(id: ID!): Movie
		getPosts: [Post]
		getPost(id: ID!): Post
	}
	input InputMovie {
		title: String!
		date: Int
	}
	input InputRegister {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}
	input InputLogin {
		username: String!
		password: String!
	}
	input InputPost {
		title: String!
		body: String!
	}
	input InputEditPost {
		id: ID!
		title: String
		body: String
	}
	type Mutation {
		register(inputRegister: InputRegister!): User!
		login(inputLogin: InputLogin!): User!
		addMovie(inputMovie: InputMovie!): Movie!
		deleteMovie(id: ID!): Movie!
		addPost(inputPost: InputPost!): Post!
		deletePost(id: ID!): Post!
		editPost(inputEditPost: InputEditPost!): Post!
	}
	type Subscription {
		newMovie: Movie!
		newPost: Post!
	}
`;
