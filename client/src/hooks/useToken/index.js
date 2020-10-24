import { useState, useCallback, useEffect } from 'react';

const storageName = 'userIDToken';

export const useTokenID = () => {
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);
	const [userName, setUserName] = useState(null);

	const tokenToStorage = useCallback((jwtToken, id, username) => {
		setToken(jwtToken);
		setUserId(id);
		setUserName(username);

		localStorage.setItem(
			storageName,
			JSON.stringify({
				userId: id,
				token: jwtToken,
				username,
			})
		);
	}, []);

	const clearToken = useCallback(() => {
		setToken(null);
		setUserId(null);
		setUserName(null);
		localStorage.removeItem(storageName);
	}, []);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName));

		if (data && data.token) {
			tokenToStorage(data.token, data.userId, data.username);
		}
	}, [tokenToStorage]);

	return { tokenToStorage, clearToken, token, userId, userName };
};
