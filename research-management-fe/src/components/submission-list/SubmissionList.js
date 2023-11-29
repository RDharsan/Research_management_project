import React from 'react';
import SubmissionListItem from './SubmissionListItem';

const SubmissionList = ({ submissions, onDelete }) => {
	return (
		<div className='row'>
			<div className='col-md-12'>
				{submissions.map((submission, index) => {
					return (
						<SubmissionListItem
							id={submission._id}
							key={index}
							deadline={submission.submissionDate}
							description={submission.description}
							name={submission.name}
							fileTypes={submission.types}
							markingScheme={submission.markingScheme}
							onDelete={onDelete}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default SubmissionList;
