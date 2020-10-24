const { model, Schema } = require('mongoose');

const movieSchema = new Schema({
	title: String,
	date: Number,
	username: String,
});

module.exports = model('Movie', movieSchema);
