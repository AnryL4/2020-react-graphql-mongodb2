const { model, Schema } = require('mongoose');

const postSchema = new Schema({
	title: String,
	body: String,
	date: Date,
	user: {
		username: String,
		email: String,
		id: String,
	},
});

module.exports = model('Post', postSchema);
