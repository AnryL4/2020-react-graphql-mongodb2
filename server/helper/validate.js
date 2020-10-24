const isEmail = require('validator/lib/isEmail');

module.exports.validateLogin = (username, password) => {
	const errors = {};

	if (username.trim() === '') {
		errors.username = 'Имя пользователя не может быть пустым';
	}
	if (password.trim() === '') {
		errors.password = 'Пароль не может быть пустым';
	}

	return {
		errors,
		validate: Object.keys(errors).length > 0,
	};
};

module.exports.validateRegister = (
	username,
	password,
	confirmPassword,
	email
) => {
	const errors = {};

	if (email.trim() === '') {
		errors.email = 'Имя пользователя не может быть пустым';
	}
	if (!isEmail(email)) {
		errors.email = 'Введите корректный email';
	}
	if (username.trim() === '') {
		errors.username = 'Имя пользователя не может быть пустым';
	}
	if (password.trim() === '') {
		errors.password = 'Пароль не может быть пустым';
	}
    if (password !== confirmPassword) {
        errors.passwords = 'Пароли не совпадают';
    }

	return {
		errors,
		validate: Object.keys(errors).length > 0,
	};
};
