import axios from 'axios';
import { getToken } from './auth.util';

//get categories
export const getCategories = async () => {
	const token = getToken();
	try {
		const response = await axios.get('/api/category', {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return { status: true, categories: response.data.categories };
		}
		return { status: false, message: 'Error getting categories' };
	} catch (error) {
		return { status: false, message: 'Error getting categories' };
	}
};

//add research
export const addResearch = async (research) => {
	const token = getToken();
	try {
		const response = await axios.post('/api/rt', research, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 201) {
			return { status: true, message: 'Research added successfully' };
		}
		return { status: false, message: 'Error adding research' };
	} catch (error) {
		return { status: false, message: 'Error adding research' };
	}
};

//get my group research
export const getMyGroupResearch = async (id) => {
	const token = getToken();
	try {
		const response = await axios.get(`/api/rt/group/${id}`, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return { status: true, research: response.data.researchTopics };
		}
		return { status: false, message: 'Error getting research' };
	} catch (error) {
		return { status: false, message: 'Error getting research' };
	}
};

//request supervisor
export const requestSupervisor = async (id, data) => {
	const token = getToken();
	try {
		const response = await axios.put(`/api/rt/request/${id}`, data, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return {
				status: true,
				message: 'Request sent successfully',
				user: response.data.user
			};
		}
		return { status: false, message: 'Error sending request' };
	} catch (error) {
		return { status: false, message: error.response.data.message };
	}
};
