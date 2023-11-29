import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [authState, setAuthState] = useState({});

	useEffect(() => {
		const token = localStorage.getItem('token');
		const userInfo = localStorage.getItem('userInfo');
		const expiresAt = localStorage.getItem('expiresAt');

		setAuthState({
			token,
			expiresAt,
			userInfo: userInfo ? JSON.parse(userInfo) : {}
		});
	}, []);

	const setAuthInfo = ({ token, userInfo, expiresAt }) => {
		localStorage.setItem('token', token);
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
		localStorage.setItem('expiresAt', expiresAt);
		setAuthState({
			token,
			userInfo,
			expiresAt
		});
		navigate('/');
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userInfo');
		localStorage.removeItem('expiresAt');
		setAuthState({});
		navigate('/login');
	};

	const isAuthenticated = () => {
		const token = localStorage.getItem('token');
		const expiresAt = localStorage.getItem('expiresAt');
		if (!token || !expiresAt) {
			return false;
		}

		return new Date().getTime() / 1000 < expiresAt;
	};

	const isAdmin = () => {
		return authState.userInfo?.role === 'admin';
	};

	const getRole = () => {
		const userInfo = localStorage.getItem('userInfo');
		return userInfo ? JSON.parse(userInfo).role : authState.userInfo?.role;
	};

	const getUserInfo = () => {
		const userInfo = localStorage.getItem('userInfo');
		return userInfo ? JSON.parse(userInfo) : authState.userInfo;
	};

	const setUserInfo = (userInfo) => {
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
		setAuthState({
			...authState,
			userInfo
		});
	};

	return (
		<Provider
			value={{
				authState,
				setAuthInfo: (authInfo) => setAuthInfo(authInfo),
				logout,
				isAuthenticated,
				isAdmin,
				getRole,
				getUserInfo,
				setUserInfo
			}}>
			{children}
		</Provider>
	);
};

export { AuthContext, AuthProvider };
