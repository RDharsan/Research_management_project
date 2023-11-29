import axios from 'axios';
export const getToken = () => {
	const token = localStorage.getItem('token');
	if (token) {
		return token;
	}
	return null;
};

export const getUserInfo = async (id) => {
	const token = getToken();
	try {
		const response = await axios.get(`/api/auth/user/${id}`, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return { status: true, user: response.data.user };
		}
		return { status: false, error: response.data };
	} catch (error) {
		return { status: false, error: error.response.data.message };
	}
};

// delete user
export const deleteUser = async (id) => {
	const token = getToken();
	if (token) {
		try {
			const res = await axios.delete(`api/auth/user/${id}`, {
				headers: {
					authorization: `${token}`
				}
			});
			if (res.status === 200) {
				return { status: true, message: res.data.message };
			}
			return { status: false, error: res.data.message };
		} catch (error) {
			return { status: false, error: error.response.data.message };
		}
	}
};

//update user
export const updateUser = async (user) => {
	const token = getToken();
	try {
		const response = await axios.put(`/api/auth/updateuser`, user, {
			headers: {
				authorization: `${token}`
			},
			data: user
		});
		if (response.status === 200) {
			return { status: true, user: response.data.user };
		}
		return { status: false, error: response.data };
	} catch (error) {
		return { status: false, error: error.response.data.message };
	}
};
