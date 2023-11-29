import React from 'react';
import SubmittedSubmissionItem from './SubmittedSubmissionItem';

const SubmittedSubmissions = ({ submissions, onEvaluate }) => {
	return (
		<div>
			{submissions.map((submission, index) => {
				return (
					<SubmittedSubmissionItem
						key={index}
						submission={submission}
						onEvaluate={onEvaluate}
					/>
				);
			})}
		</div>
	);
};

export default SubmittedSubmissions;
