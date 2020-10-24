//Core
import { useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';
import { loader } from 'graphql.macro';
//Hooks
import { useForm } from '../useForm';
import { useMessage } from '../useMessage';
//Context
import { AuthContext } from '../../context/AuthContext';

//Queries
const mutationLogIn = loader('./gql/mutationLogIn.graphql');

export const useLogin = () => {
	const [_logIn, { loading, error }] = useMutation(mutationLogIn);

	const message = useMessage();

	const { tokenToStorage, clearToken } = useContext(AuthContext);

	const { form, handleChange, setForm } = useForm({
		username: '',
		password: '',
	});

	const logIn = async () => {
		try {
			const data = await _logIn({ variables: { inputLogin: form } });
			if (data?.data?.login) {
				tokenToStorage(
					data.data.login.token,
					data.data.login.id,
					data.data.login.username
				);
			}
			message(`Вы вошли как ${data.data.login.username}`)
			setForm({ username: '', password: '' });
		} catch (error) {
			console.log(error);
		}
	};

	const logOut = async () => {
		try {
			clearToken();
		} catch (error) {
			console.log(error);
		}
	};

	return { logIn, logOut, handleChange, form, loading, error, message };
};
