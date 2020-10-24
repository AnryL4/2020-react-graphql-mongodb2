import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const useTextEditor = () => {
	const [value, setValue] = useState('');

	const textEditor = (
		<ReactQuill theme='snow' value={value} onChange={setValue} />
	);

	return { textEditor, value, setValue };
};
