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
const mutationRegister = loader('./gql/mutationRegister.graphql');

export const useRegister = () => {
	const [_register, { loading, error }] = useMutation(mutationRegister);

	const message = useMessage();

	const { tokenToStorage } = useContext(AuthContext);

	const { form, handleChange, setForm } = useForm({
		username: '',
		password: '',
		confirmPassword: '',
		email: '',
	});

	const register = async () => {
		try {
			const data = await _register({
				variables: { inputRegister: form },
			});
			if (data?.data?.register) {
				tokenToStorage(
					data.data.register.token,
					data.data.register.id,
					data.data.register.username
				);
			}
			message(`Вы зарегистрировались как ${data.data.register.username}`);
			setForm({
				username: '',
				password: '',
				confirmPassword: '',
				email: '',
			});
		} catch (error) {
			console.log(error);
		}
	};

	return { register, handleChange, form, loading, error, message };
};
