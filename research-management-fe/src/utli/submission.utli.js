import axios from 'axios';
import { getToken } from './auth.util';

// get submission by submission type id and group id
export const getSubmission = async (submissionTypeId, groupId) => {
	const token = getToken();
	try {
		const response = await axios.get(
			`/api/submission/get/${submissionTypeId}/${groupId}`,
			{
				headers: {
					authorization: `${token}`
				}
			}
		);
		if (response.status === 200) {
			return {
				status: true,
				submissionType: response.data.submissionType,
				submission: response.data.submission
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error getting submission'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// create submission
export const createSubmission = async (payload) => {
	const token = getToken();
	try {
		const response = await axios.post('/api/submission', payload, {
			headers: {
				authorization: `${token}`
			}
		});
		if (response.status === 201) {
			return {
				status: true,
				submission: response.data.submission
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error creating submission'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// get submissions for panels
export const getSubmissionsByPanelIds = async (panelIds) => {
	const token = getToken();
	try {
		const response = await axios.post(
			`/api/submission/get-submissions-to-evaluate`,
			{ panel_ids: panelIds },
			{
				headers: {
					authorization: `${token}`
				}
			}
		);
		if (response.status === 200) {
			return {
				status: true,
				submissions: response.data.submissions
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error getting submissions'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// evaluate submission
export const evaluateSubmission = async (id, payload) => {
	const token = getToken();
	try {
		const response = await axios.put(
			`/api/submission/evaluate/${id}`,
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
				submission: response.data.submission
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error evaluating submission'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// get evaluated submissions by panel ids
export const getEvaluatedSubmissionsByPanelIds = async (panelIds) => {
	const token = getToken();
	try {
		const response = await axios.post(
			`/api/submission/get-evaluated-for-panel`,
			{ panel_ids: panelIds },
			{
				headers: {
					authorization: `${token}`
				}
			}
		);
		if (response.status === 200) {
			return {
				status: true,
				submissions: response.data.submissions
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error getting submissions'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};

// get submissions for student group
export const getSubmissionsByStudentGroupId = async (studentGroupId) => {
	const token = getToken();
	try {
		const response = await axios.get(
			`/api/submission/student-group/${studentGroupId}`,
			{
				headers: {
					authorization: `${token}`
				}
			}
		);
		if (response.status === 200) {
			return {
				status: true,
				submissions: response.data.submissions
			};
		}
		return {
			status: false,
			error: response.data,
			message: 'error getting submissions'
		};
	} catch (error) {
		return {
			status: false,
			error: error.response.data.message,
			message: error.response.data.message
		};
	}
};
