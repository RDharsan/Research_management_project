import axios from 'axios';
import { getToken } from './auth.util';

// get staff
export const getStaff = async () => {
	const token = getToken();
	try {
		const response = await axios.get('/api/staff/all', {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return {
				status: true,
				staff: response.data.staffMembers
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error getting staff'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// create panel
export const createPanel = async (panel) => {
	const token = getToken();
	try {
		const response = await axios.post('/api/panel', panel, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 201) {
			return {
				status: true,
				panel: response.data.panel
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error creating panel'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

//load panels
export const loadPanels = async () => {
	const token = getToken();
	try {
		const response = await axios.get('/api/panel/all', {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return {
				status: true,
				panels: response.data.panels
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error loading panels'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// add staff member to panel
export const addStaffMemberToPanel = async (panelId, staffMemberId) => {
	const token = getToken();
	try {
		const response = await axios.put(
			`/api/panel/add-staff/${panelId}`,
			{
				staff_member: staffMemberId
			},
			{
				headers: {
					authorization: `${token}`
				}
			}
		);
		if (response.status === 200) {
			return {
				status: true,
				panel: response.data.panel
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error adding staff member to panel'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};
