import axios from 'axios';
import { getToken } from './auth.util';

// add category to staff
export const addCategoryToStaff = async (payload) => {
	const token = getToken();
	try {
		const response = await axios.post(
			`/api/staff/add-category-to-profile`,
			payload,
			{
				headers: {
					authorization: `${token}`
				}
			}
		);
		if (response.status === 201) {
			return {
				status: true,
				staff: response.data.staff
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error adding category to staff'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// get supervisor and co-supervisor requests
export const getSupervisorAndCoSupervisorRequests = async () => {
	const token = getToken();
	try {
		const response = await axios.get(`/api/rt/get-requst-by-staff-member`, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return {
				status: true,
				supervisor_requests: response.data.supervisor_requests,
				co_supervisor_requests: response.data.co_supervisor_requests
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error getting supervisor and co-supervisor requests'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// approve supervisor and co-supervisor requests
export const approveSupervisorAndCoSupervisorRequests = async (id, payload) => {
	const token = getToken();
	try {
		const response = await axios.put(`/api/rt/approve/${id}`, payload, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return {
				status: true
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error approving supervisor and co-supervisor requests'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// create category
export const createCategory = async (payload) => {
	const token = getToken();
	try {
		const response = await axios.post(`/api/category`, payload, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 201) {
			return {
				status: true,
				category: response.data.category
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error creating category'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};
