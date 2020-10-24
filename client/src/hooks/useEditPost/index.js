//Core
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

//Hooks
import { useMessage } from '../useMessage';
import { useForm } from '../useForm';
import { useTextEditor } from '../useTextEditor';

//Queries
const mutationEditPost = loader('./gql/mutationEditPost.graphql');

export const useEditPost = () => {
	const [_editPost, { loading }] = useMutation(mutationEditPost);

	const { form, handleChange, setForm } = useForm({
		title: '',
	});

	const { textEditor, value, setValue } = useTextEditor();

	const message = useMessage();

	const editPost = async (id, title, body) => {
		try {
			const data = await _editPost({
				variables: { inputEditPost: { id, title, body } },
			});
			message(data?.data?.editPost?.title + ' Изменён!');
		} catch (error) {
			message(error.graphQLErrors[0].message);
			console.log(error);
		}
	};

	return {
		editPost,
		loading,
		form,
		handleChange,
		setForm,
		textEditor,
		value,
		setValue,
	};
};
