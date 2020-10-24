import { Modal, Button } from 'react-materialize';
import React, { useEffect } from 'react';

//Hooks
import { useDeletePost } from '../hooks/useDeletePost';
import { useEditPost } from '../hooks/useEditPost';

// Components
import { Loader } from './Loader';

export const ModalView = ({
	textButton,
	textHeader,
	textBody,
	textTitle,
	postId,
}) => {
	const { deletePost, loading } = useDeletePost();
	const {
		editPost,
		form,
		handleChange,
		setForm,
		textEditor,
		value,
		setValue,
	} = useEditPost();

	useEffect(() => setForm({ title: textTitle }), [
		setForm,
		textTitle,
		textBody,
	]);

	useEffect(() => {
		setValue(textBody);
	}, [textBody, setValue]);

	const modalDeleteJSX = (
		<>
			<p>
				Вы действительно хотите удалить пост "{textTitle}"?
			</p>
		</>
	);

	const modalEditJSX = (
		<form className='col s12'>
			<div className='row s12 mar-bot-0'>
				<div className='input-field col s12 mar-bot-0'>
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
				<div className='input-field col s12'>
					<p className='p-form'>Описание</p>
					{textEditor}
				</div>
			</div>
		</form>
	);

	return loading ? (
		<Loader />
	) : (
		<Modal
			actions={[
				<Button
					flat
					modal='close'
					node='button'
					waves='green'
					onClick={
						textButton === 'Удалить'
							? () => deletePost(postId)
							: () => editPost(postId, form.title, value)
					}
				>
					{textButton}
				</Button>,
				<Button flat modal='close' node='button' waves='green'>
					Отменить
				</Button>,
			]}
			bottomSheet={false}
			fixedFooter={false}
			header={textHeader}
			id='Modal-0'
			open={false}
			options={{
				dismissible: true,
				endingTop: '10%',
				inDuration: 250,
				onCloseEnd: null,
				onCloseStart: null,
				onOpenEnd: null,
				onOpenStart: null,
				opacity: 0.5,
				outDuration: 250,
				preventScrolling: true,
				startingTop: '4%',
			}}
			trigger={<Button node='button'>{textButton}</Button>}
		>
			{textButton === 'Удалить' ? modalDeleteJSX : modalEditJSX}
		</Modal>
	);
};
