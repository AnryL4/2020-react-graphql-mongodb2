import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
//Components
import { Navbar } from './components/Navbar';
//Routes
import { routes } from './routes';
//Hooks
import { useTokenID } from './hooks/useToken';
//Context
import { AuthContext } from './context/AuthContext';
//Styles
import 'materialize-css';

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache: new InMemoryCache(),
	request: (operation) => {
		const token = JSON.parse(localStorage.getItem('userIDToken'))?.token;
		const userId = JSON.parse(localStorage.getItem('userIDToken'))?.userId;
		operation.setContext({
			headers: {
				authorization: token ? token : '',
				userId: userId ? userId : '',
			},
		});
	},
});

const App = () => {
	const { tokenToStorage, clearToken, token, userId, userName } = useTokenID();

	return (
		<ApolloProvider client={client}>
			<AuthContext.Provider
				value={{ tokenToStorage, clearToken, token, userId, userName }}
			>
				<div className='container'>
					<Router>
						<Navbar />
						<Switch>
							{routes.map((route) => {
								return (
									<Route
										key={route.name}
										exact={route.isExact}
										path={route.path}
										component={route.component}
									/>
								);
							})}
							<Redirect to='/' />
						</Switch>
					</Router>
				</div>
			</AuthContext.Provider>
		</ApolloProvider>
	);
};

export default App;
