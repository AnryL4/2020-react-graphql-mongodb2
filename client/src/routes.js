import { LoginPage } from './pages/LoginPage';
import { Posts } from './pages/Posts';
import { RegisterPage } from './pages/RegisterPage';

export const routes = [
	{
		isExact: true,
		path: '/',
		name: 'Home',
		component: Posts,
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginPage,
	},
	{
		path: '/register',
		name: 'Register',
		component: RegisterPage,
	},
];
