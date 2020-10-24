import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
//Context
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
	const auth = useContext(AuthContext);

	const logInJSX = (
		<>
			<li>
				<NavLink to='/login' className='waves-effect waves-light btn'>
					Логин
				</NavLink>
			</li>
			<li>
				<NavLink
					to='/register'
					className='waves-effect waves-light btn'
				>
					Регистрация
				</NavLink>
			</li>
		</>
	);

	const logOutJSX = (
		<>
			<li>
				<span style={{ marginRight: '15px' }}>{auth.userName}</span>
				<button
					className='waves-effect red darken-4 btn'
					style={{ marginRight: '15px' }}
					onClick={auth.clearToken}
				>
					Выйти
				</button>
			</li>
		</>
	);

	return (
		<nav>
			<div className='nav-wrapper blue-grey darken-4'>
				<NavLink to='/' className='brand-logo'>
					React + Graphql + MongoDB
				</NavLink>
				<ul id='nav-mobile' className='right hide-on-med-and-down'>
					{auth.token ? logOutJSX : logInJSX}
				</ul>
			</div>
		</nav>
	);
};
