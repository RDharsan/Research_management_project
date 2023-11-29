import React, { useEffect, useState, useContext } from 'react';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../store/auth';
import { getSubmission } from '../../utli/submission.utli';
import Loading from '../loading/Loading';
import SubmissionListItem from '../submission-list/SubmissionListItem';
import SubmitSubmission from '../submit-submission/SubmitSubmission';

const ViewSubmission = () => {
	const { id } = useParams();
	const { getUserInfo } = useContext(AuthContext);
	const userInfo = getUserInfo();

	const [isSubmissionLoading, setIsSubmissionLoading] = useState(true);
	const [submission, setSubmission] = useState(null);
	const [submissionType, setSubmissionType] = useState(null);

	const load = async () => {
		setIsSubmissionLoading(true);
		const response = await getSubmission(id, userInfo.studentGroup);
		if (response.status) {
			setSubmission(response.submission);
			setSubmissionType(response.submissionType);
		} else {
			toast.error(response.message);
		}
		setIsSubmissionLoading(false);
	};
	useEffect(() => {
		load();
	}, []);

	const onSubmission = (submission) => {
		setSubmission(submission);
	};
	return (
		<div className='row'>
			<div className='col-md-12'>
				<h1>View Submission</h1>
			</div>
			{isSubmissionLoading ? (
				<Loading />
			) : submissionType ? (
				<SubmissionListItem
					id={submissionType._id}
					deadline={submissionType.submissionDate}
					description={submissionType.description}
					name={submissionType.name}
					fileTypes={submissionType.types}
					markingScheme={submissionType.markingScheme}
					isList={false}
					submission={
						Object.keys(submission).length !== 0 ? (
							<div className='row'>
								<h5>
									Your group has already submitted to this
									submission
								</h5>
								<div className='col-md-6'>
									Submitted on:{' '}
									<span className='rounded-pill badge bg-success '>
										<Moment format='YYYY-MMMM-DD HH:MM'>
											{submission.date}
										</Moment>
									</span>
								</div>
								<div className='col-md-6 text-end'>
									<a
										href={submission.files[0]}
										target='_blank'
										className='btn btn-primary'>
										Download submitted file
									</a>
								</div>
							</div>
						) : (
							<SubmitSubmission
								fileTypes={submissionType.types}
								groupID={userInfo.studentGroup}
								submissionTypeID={submissionType._id}
								onSubmission={onSubmission}
							/>
						)
					}
				/>
			) : (
				<div>
					<h1>No submission found</h1>
				</div>
			)}
		</div>
	);
};

export default ViewSubmission;
