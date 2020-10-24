//Core
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

//Hooks
import { useMessage } from '../useMessage';
import { useForm } from '../useForm';
import { useTextEditor } from '../useTextEditor';

//Queries
const mutationAddPost = loader('./gql/mutationAddPost.graphql');
const queryPosts = loader('../useQueryPosts/gql/queryPosts.graphql');

export const useAddPost = () => {
	const [_addPost] = useMutation(mutationAddPost, {
		update(cache, { data }) {
			if (cache.data.data.ROOT_QUERY) {
				const { getPosts } = cache.readQuery({
					query: queryPosts,
				});
				getPosts.push(data.addPost);
				cache.writeQuery({
					query: queryPosts,
					data: { getPosts },
				});
			}
		},
	});

	const { form, handleChange, setForm } = useForm({
		title: '',
		visible: true,
	});

	const { textEditor, value, setValue } = useTextEditor();

	const message = useMessage();

	const addPost = async (title, body) => {
		try {
			const data = await _addPost({
				variables: { inputPost: { title, body } },
			});
			message(data?.data?.addPost?.title + ': Пост добавлен!');
			setForm((prev) => {
				return { title: '', visible: !prev.visible };
			});
			setValue('');
		} catch (error) {
			message(error?.graphQLErrors[0]?.message);
			console.log(error);
		}
	};

	return {
		addPost,
		form,
		handleChange,
		setForm,
		textEditor,
		value,
	};
};
