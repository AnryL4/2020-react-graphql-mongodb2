const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

module.exports.auth = (context) => {
	const authHeader = context.req.headers.authorization;
	const id = context.req.headers.userid;

	if (authHeader) {
		try {
			const user = jwt.verify(authHeader, 'some PRIVATE KEY');
			user.id = id;
			return user;
		} catch (error) {
			throw new AuthenticationError(
				'Пользователь не определён (invalid token)'
			);
		}
	} else {
		throw new AuthenticationError('Вы не залогинены');
	}
};
