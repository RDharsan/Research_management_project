import axios from 'axios';
import { getToken } from './auth.util';

export const loadGroupForStudent = async (studentId) => {
	const token = getToken();
	try {
		const response = await axios.get(`/api/sg/student/${studentId}`, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return { status: true, group: response.data.studentGroup };
		}
		return { status: false, error: response.data };
	} catch (error) {
		return { status: false, error: error.response.data.message };
	}
};

export const createGroup = async (group) => {
	const token = getToken();
	try {
		const response = await axios.post(`/api/sg`, group, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 201) {
			return { status: true, group: response.data.studentGroup };
		}
		return { status: false, error: response.data };
	} catch (error) {
		return { status: false, error: error.response.data.message };
	}
};

//get students without group
export const getStudentsWithoutAGroup = async () => {
	const token = getToken();
	try {
		const response = await axios.get(`/api/sg/ng-students`, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return { status: true, students: response.data.students };
		}
		return { status: false, error: response.data };
	} catch (error) {
		return { status: false, error: error.response.data.message };
	}
};

//add student to group
export const addStudentToGroup = async (student_id, group_id) => {
	const token = getToken();
	try {
		const response = await axios.post(
			`/api/sg/add-to-group`,
			{
				student_id,
				group_id
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
				message: response.data.message,
				studentGroup: response.data.studentGroup
			};
		}
		return { status: false, error: response.data.message };
	} catch (error) {
		return { status: false, error: error.response.data.message };
	}
};

//get group by id
export const getGroupById = async (groupId) => {
	const token = getToken();
	try {
		const response = await axios.get(`/api/sg/group/${groupId}`, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return { status: true, group: response.data.group };
		}
		return { status: false, error: response.data };
	} catch (error) {
		return { status: false, error: error.response.data.message };
	}
};

//get joinable groups
export const getJoinableGroups = async () => {
	const token = getToken();
	try {
		const response = await axios.get(`/api/sg/joinable-groups`, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return { status: true, groups: response.data.studentGroups };
		}
		return { status: false, error: response.data };
	} catch (error) {
		return { status: false, error: error.response.data.message };
	}
};

// get all groups
export const getAllGroups = async () => {
	const token = getToken();
	try {
		const response = await axios.get(`/api/sg/all-groups`, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return { status: true, groups: response.data.studentGroups };
		}
		return { status: false, error: response.data };
	} catch (error) {
		return { status: false, error: error.response.data.message };
	}
};

// assing pannel to group
export const assignPanelToGroup = async (payload) => {
	const token = getToken();
	try {
		const response = await axios.put(`/api/sg//add-panel`, payload, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 200) {
			return { status: true, message: response.data.message };
		}
		return { status: false, error: response.data.message };
	} catch (error) {
		return { status: false, error: error.response.data.message };
	}
};
