import React from 'react';
//Hooks
import { useQueryPosts } from '../hooks/useQueryPosts';
import { useAddPost } from '../hooks/useAddPost';
//Components
import { Post } from '../components/Post';
import { Loader } from '../components/Loader';

export const Posts = () => {
	const { loading, error, posts } = useQueryPosts();

	const {
		addPost,
		form,
		handleChange,
		setForm,
		textEditor,
		value,
	} = useAddPost();

	const changeVisible = (event) => {
		event.preventDefault();
		setForm((prev) => {
			return { ...prev, visible: !prev.visible };
		});
	};

	const sendFormAddPost = async (event) => {
		event.preventDefault();
		try {
			await addPost(form.title, value);
		} catch (error) {
			console.log(error);
		}
	};

	const loadingJSX = loading && (
		<>
			<Loader />
		</>
	);
	const postsJSX = (posts?.length && <Post posts={posts} />) || (
		<>
			<p>Нет постов</p>
		</>
	);
	const errorJSX = error && (
		<>
			<p>Error: {error.message}</p>
		</>
	);

	const formAddPostJSX = !form.visible ? (
		<>
			<h2>Добавить пост</h2>
			<form className='col s12 form-shadow'>
				<div className='row s12 mar-bot-0'>
					<div className='input-field col s12'>
						<label htmlFor='title' className='active'>
							Заголовок
						</label>
						<input
							placeholder='Заголовок'
							id='title'
							name='title'
							type='text'
							className='validate'
							onChange={handleChange}
							value={form.title}
						/>
					</div>
				</div>
				<div className='row s12'>
					<div className='input-field col s12 mar-top-0'>
						<p className='p-form'>Описание</p>
						{textEditor}
					</div>
				</div>
				<button
					className='btn waves-effect waves-light'
					onClick={sendFormAddPost}
				>
					Создать
					<i className='material-icons right'>send</i>
				</button>
			</form>
		</>
	) : null;

	return (
		<>
			<div className='h1-flex'>
				<h1>Посты</h1>
				<button
					className='btn-floating btn-large waves-effect waves-light red'
					onClick={changeVisible}
				>
					<i className='material-icons'>add</i>
				</button>
			</div>
			{formAddPostJSX}
			{form.visible ? postsJSX : null}
			{loadingJSX}
			{errorJSX}
		</>
	);
};
