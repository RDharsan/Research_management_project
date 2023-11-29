import axios from 'axios';
import { getToken } from './auth.util';

// get all templates
export const getAllTemplates = async () => {
	const token = getToken();
	try {
		const response = await axios.get(`/api/template`, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return {
				status: true,
				templates: response.data.templates
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error getting all templates'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// create template
export const createTemplate = async (payload) => {
	const token = getToken();
	try {
		const response = await axios.post(`/api/template`, payload, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 201) {
			return {
				status: true,
				template: response.data.template
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error creating template'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

//update template
export const updateTemplate = async (id, payload) => {
	const token = getToken();
	try {
		const response = await axios.put(
			`/api/template/update/${id}`,
			payload,
			{
				headers: {
					authorization: `${token}`
				}
			}
		);
		if (response.status === 200) {
			return {
				status: true,
				template: response.data.template
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error updating template'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// delete template
export const deleteTemplate = async (id) => {
	const token = getToken();
	try {
		const response = await axios.delete(`/api/template/delete/${id}`, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return {
				status: true,
				template: response.data.template
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error deleting template'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// get template by id
export const getTemplateById = async (id) => {
	const token = getToken();
	try {
		const response = await axios.get(`/api/template/get/${id}`, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return {
				status: true,
				template: response.data.template
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error getting template'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};
