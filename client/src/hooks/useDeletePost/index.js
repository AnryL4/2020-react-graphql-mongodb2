//Core
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

//Hooks
import { useMessage } from '../useMessage';

//Queries
const mutationDeletePost = loader('./gql/mutationDeletePost.graphql');
const queryPosts = loader('../useQueryPosts/gql/queryPosts.graphql');

export const useDeletePost = () => {
	const [_deletePost, { loading }] = useMutation(mutationDeletePost, {
		update(cache, { data }) {
			// cache нам нужно изменять стейт приложения, он находится в cache.data.data.ROOT_QUERY
			// data - содержит данные возвращаемые мутацией: id и title удаленного поста в data.deletePost.id, data.deletePost.title
			if (cache.data.data.ROOT_QUERY) {
				const { getPosts } = cache.readQuery({
					query: queryPosts,
				});
				const newPosts = getPosts.filter(
					(post) => post.id !== data.deletePost.id
				);
				cache.writeQuery({
					query: queryPosts,
					data: { getPosts: newPosts },
				});
			}
		},
	});

	const message = useMessage();

	const deletePost = async (id) => {
		try {
			const data = await _deletePost({ variables: { id } });
			message(data?.data?.deletePost?.title + ' Удалён!');
		} catch (error) {
			message(error.graphQLErrors[0].message);
			console.log(error);
		}
	};

	return { deletePost, loading };
};
