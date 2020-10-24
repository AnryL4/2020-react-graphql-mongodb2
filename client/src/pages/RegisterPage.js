import React, { useEffect, useContext } from 'react';
//Hooks
import { useRegister } from '../hooks/useRegister';
//Components
import { Loader } from '../components/Loader';
//Context
import { AuthContext } from '../context/AuthContext';

export const RegisterPage = ({ history }) => {
	const {
		loading,
		error,
		register,
		handleChange,
		form,
		message,
	} = useRegister();

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
			<h1>Регистрация</h1>
			<div className='container'>
				<div className='row'>
					<form className='col s12'>
						<div className='row'>
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
						<div className='row'>
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
						<div className='row'>
							<div className='input-field col s12'>
								<label htmlFor='confirmPassword'>
									Повторите пароль
								</label>
								<input
									placeholder='Повторите пароль'
									id='confirmPassword'
									name='confirmPassword'
									type='password'
									className='validate'
									onChange={handleChange}
									value={form.confirmPassword}
								/>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<label htmlFor='email'>Имейл</label>
								<input
									placeholder='Имейл'
									id='email'
									name='email'
									type='text'
									className='validate'
									onChange={handleChange}
									value={form.email}
								/>
							</div>
						</div>
					</form>
				</div>
				<button
					className='waves-effect waves-light btn'
					onClick={register}
				>
					Зарегистрироваться
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
