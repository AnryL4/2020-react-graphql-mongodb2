import React, { useEffect, useContext } from 'react';
//Hooks
import { useLogin } from '../hooks/useLogin';
//Components
import { Loader } from '../components/Loader';
//Context
import { AuthContext } from '../context/AuthContext';

export const LoginPage = ({ history }) => {
	const { loading, error, logIn, handleChange, form, message } = useLogin();

	const { token } = useContext(AuthContext);

	useEffect(() => {
		if (token) {
			history.push('/');
		}
	}, [history, token]);

	useEffect(() => {
		let messageError =
			error?.graphQLErrors[0]?.message || error?.message || error;
		if (error?.graphQLErrors[0]?.extensions.errors) {
			messageError = Object.values(
				error?.graphQLErrors[0]?.extensions.errors
			).join(', ');
		}
		message(messageError);
	}, [error, message]);

	const contentJSX = (
		<>
			<h1>Логин</h1>
			<div className='container'>
				<div className='row'>
					<form className='col s12'>
						<div className='row s12'>
							<div className='input-field col s12'>
								<label htmlFor='username'>Логин</label>
								<input
									placeholder='Логин'
									id='username'
									name='username'
									type='text'
									className='validate'
									onChange={handleChange}
									value={form.username}
								/>
							</div>
						</div>
						<div className='row s12'>
							<div className='input-field col s12'>
								<label htmlFor='password'>Пароль</label>
								<input
									placeholder='Пароль'
									id='password'
									name='password'
									type='password'
									className='validate'
									onChange={handleChange}
									value={form.password}
								/>
							</div>
						</div>
					</form>
				</div>
				<button
					className='waves-effect waves-light btn'
					onClick={logIn}
				>
					Войти
				</button>
			</div>
		</>
	);

	const loadingJSX = loading && (
		<>
			<Loader />
		</>
	);

	return (
		<>
			{contentJSX}
			{loadingJSX}
		</>
	);
};
