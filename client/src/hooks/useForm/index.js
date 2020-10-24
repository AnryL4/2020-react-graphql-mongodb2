import { useState } from 'react';

export const useForm = (initialValues) => {
	const [form, setForm] = useState(initialValues);

	const handleChange = (event) => {
		event.persist();
		setForm((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	return { handleChange, form, setForm };
};
