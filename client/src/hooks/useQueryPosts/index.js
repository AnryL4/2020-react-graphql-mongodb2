import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

//Queries
const queryPosts = loader('./gql/queryPosts.graphql');

export const useQueryPosts = () => {
	const { loading, error, data } = useQuery(queryPosts);

	return {
		loading,
		error,
		posts: data && data.getPosts,
	};
};
