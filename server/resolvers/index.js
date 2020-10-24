const jwt = require('jsonwebtoken');
const Movie = require('../models/movie');
const Post = require('../models/post');
const User = require('../models/user');
const { UserInputError, AuthenticationError } = require('apollo-server');
const { validateLogin, validateRegister } = require('../helper/validate');
const { auth } = require('../helper/auth');

const generateToken = (user) =>
	jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		'some PRIVATE KEY'
		// { expiresIn: '1h' }
	);

module.exports = {
	Query: {
		async getMovies() {
			try {
				const movies = await Movie.find().sort();
				return movies;
			} catch (err) {
				console.log(err);
			}
		},
		async getMovie(_, { id }) {
			try {
				const movie = await Movie.findById(id);
				return movie;
			} catch (error) {
				console.log(error);
			}
		},
		async getPosts() {
			try {
				const posts = await Post.find().sort();
				return posts;
			} catch (err) {
				console.log(err);
			}
		},
		async getPost(_, { id }) {
			try {
				const post = await Post.findById(id);
				return post;
			} catch (error) {
				console.log(error);
			}
		},
	},
	Mutation: {
		async addMovie(_, args, context) {
			const user = auth(context);
			const newMovie = new Movie({
				...args.inputMovie,
				username: user.username,
			});

			const movie = await newMovie.save();

			context.pubSub.publish('NEW_MOVIE', {
				newMovie: movie,
			});

			return movie;
		},
		async addPost(_, args, context) {
			try {
				const user = auth(context);
				const newPost = new Post({
					...args.inputPost,
					date: Date.now(),
					user: user,
				});
				if (newPost.title.trim() === '') {
					throw new Error('Нельзя создавать посты без заголовка');
				}

				const post = await newPost.save();

				context.pubSub.publish('NEW_POST', {
					newPost: post,
				});

				return post;
			} catch (error) {
				throw new Error(error.message);
			}
		},
		async editPost(_, { inputEditPost: { id, ...args } }, context) {
			const user = auth(context);
			try {
				const post = await Post.findById(id);
				if (user.username === post.user.username) {
					await Post.findByIdAndUpdate(id, {
						...args,
					});
					return await Post.findById(id);
				} else {
					throw new AuthenticationError(
						'Вы можете редактировать только собственные посты'
					);
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		async deleteMovie(_, { id }, context) {
			const user = auth(context);
			try {
				const movie = await Movie.findById(id);
				if (user.username === movie.username) {
					movie.delete();
					return movie;
				} else {
					throw new AuthenticationError(
						'Действие запрещено для данного пользователя'
					);
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		async deletePost(_, { id }, context) {
			const user = auth(context);
			try {
				const post = await Post.findById(id);
				if (user.username === post.user.username) {
					post.delete();
					return post;
				} else {
					throw new AuthenticationError(
						'Действие запрещено для данного пользователя'
					);
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		async register(
			_,
			{ inputRegister: { username, password, confirmPassword, email } }
		) {
			const { errors, validate } = validateRegister(
				username,
				password,
				confirmPassword,
				email
			);

			if (validate) {
				throw new UserInputError('Параметры не валидные', { errors });
			}

			const user = await User.findOne({ username });

			if (user) {
				throw new Error('Такой юзер уже существует');
			}

			const newUser = new User({
				username,
				email,
				password,
			});
			const result = await newUser.save();
			const token = generateToken(result);
			return { ...result._doc, id: result._id, token };
		},
		async login(_, { inputLogin: { username, password } }) {
			const { errors, validate } = validateLogin(username, password);

			const user = await User.findOne({ username });

			if (validate) {
				throw new UserInputError('Произошла ошибка', { errors });
			}

			if (!user) {
				throw new Error('Такого юзера не существует');
			}
			const match = password === user.password;
			if (!match) {
				throw new Error('Неверный пароль');
			}
			const token = generateToken(user);
			return { ...user._doc, id: user._id, token };
		},
	},
	Subscription: {
		newMovie: {
			subscribe: (_, __, context) =>
				context.pubSub.asyncIterator('NEW_MOVIE'),
		},
		newPost: {
			subscribe: (_, __, context) =>
				context.pubSub.asyncIterator('NEW_POST'),
		},
	},
};
