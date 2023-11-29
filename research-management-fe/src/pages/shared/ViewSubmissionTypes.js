import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';
import SubmissionList from '../../components/submission-list/SubmissionList';
import { AuthContext } from '../../store/auth';
import {
	deleteSubmissionType,
	getSubmissionTypes
} from '../../utli/submission-type.util';

const ViewSubmissionTypes = () => {
	const [submissionTypes, setSubmissionTypes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({});
	const { getRole } = useContext(AuthContext);
	const role = getRole();

	const loadSubmissionTypes = async () => {
		setLoading(true);
		const response = await getSubmissionTypes();
		if (response.status) {
			setSubmissionTypes(response.submissionTypes);
		} else {
			setError('Error loading submission types');
			// toast.error('Error loading submission types');
		}
		setLoading(false);
	};

	useEffect(() => {
		loadSubmissionTypes();
	}, []);

	const deleteSubmission = async (id) => {
		if (window.confirm('Are you sure you need to delete this?')) {
			setLoading(true);
			const response = await deleteSubmissionType(id);
			if (response.status) {
				toast.success('Submission type deleted');
				const newSubmissionTypes = submissionTypes.filter(
					(submissionType) => submissionType._id !== id
				);
				setSubmissionTypes(newSubmissionTypes);
			} else {
				toast.error(response.message);
			}
			setLoading(false);
		}
	};

	return (
		<div className='row'>
			<div className='col-md-12'>
				<h1>{role === 'admin' ? 'Manage' : ''} Submission Types</h1>
			</div>
			{loading ? (
				<Loading />
			) : submissionTypes.length > 0 ? (
				<SubmissionList
					submissions={submissionTypes}
					onDelete={deleteSubmission}
				/>
			) : (
				<div className='col-md-12 text-center form-background'>
					<h1>No submissions yet</h1>
				</div>
			)}
		</div>
	);
};

export default ViewSubmissionTypes;
