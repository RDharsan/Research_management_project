import axios from 'axios';
import { getToken } from './auth.util';

export const addSubmissionType = async (submissionType) => {
	const token = getToken();
	try {
		const response = await axios.post(
			'/api/submission-type',
			submissionType,
			{
				headers: {
					authorization: `${token}`
				}
			}
		);
		if (response.status === 201) {
			return {
				status: true,
				submissionType: response.data.submissionType
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error adding submission type'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// get all submission types
export const getSubmissionTypes = async () => {
	const token = getToken();
	try {
		const response = await axios.get('/api/submission-type/all', {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return {
				status: true,
				submissionTypes: response.data.submissionTypes
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error getting submission types'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

//get submission type by id
export const getSubmissionTypeById = async (id) => {
	const token = getToken();
	try {
		const response = await axios.get(`/api/submission-type/get/${id}`, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return {
				status: true,
				submissionType: response.data.submissionType
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error getting submission type'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

//update submission type
export const updateSubmissionType = async (submissionType) => {
	const token = getToken();
	try {
		const response = await axios.put(
			`/api/submission-type/update/${submissionType._id}`,
			submissionType,
			{
				headers: {
					authorization: `${token}`
				}
			}
		);
		if (response.status === 200) {
			return {
				status: true,
				submissionType: response.data.submissionType
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error updating submission type'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// delete submission type
export const deleteSubmissionType = async (id) => {
	const token = getToken();
	try {
		const response = await axios.delete(
			`/api/submission-type/delete/${id}`,
			{
				headers: {
					authorization: `${token}`
				}
			}
		);
		if (response.status === 200) {
			return {
				status: true,
				message: response.data.message
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error deleting submission type'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};
