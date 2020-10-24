import React, { useContext } from 'react';
import { Row, Col, Card, Icon } from 'react-materialize';
//Component
import { ModalView } from './ModalView';
//Context
import { AuthContext } from '../context/AuthContext';

export const Post = ({ posts }) => {
	const { userId } = useContext(AuthContext);

	const postsJSX = posts.map((post) => {
		return (
			<Row key={post.id}>
				<Col m={12} s={12}>
					<Card
						actions={
							post.user.id === userId
								? [
										<ModalView
											key='1'
											textButton='Редактировать'
											textHeader='Редактирование поста'
											textBody={post.body}
											textTitle={post.title}
											postId={post.id}
										/>,
										<ModalView
											key='2'
											textButton='Удалить'
											textHeader='Удаление поста'
											textBody={post.body}
											textTitle={post.title}
											postId={post.id}
										/>,
								  ]
								: null
						}
						className='blue-grey darken-2'
						closeIcon={<Icon>close</Icon>}
						revealIcon={<Icon>more_vert</Icon>}
						textClassName='white-text'
						title={post.title}
					>
						<div
							className='bodyPost'
							dangerouslySetInnerHTML={{ __html: post.body }}
						/>
						<h6>Автор: {post.user.username}</h6>
					</Card>
				</Col>
			</Row>
		);
	});

	return <>{postsJSX}</>;
};
