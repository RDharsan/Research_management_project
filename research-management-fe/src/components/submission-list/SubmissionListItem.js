import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../store/auth';
import Card from '../card/Card';
import Moment from 'react-moment';

const SubmissionListItem = ({
	id,
	name,
	description,
	deadline,
	fileTypes,
	markingScheme,
	onDelete,
	isList = true,
	submission
}) => {
	const { getRole } = useContext(AuthContext);
	const role = getRole();

	return (
		<div className='text-light m-2 bg-dark rounded'>
			{role === 'admin' && (
				<div className='row justify-content-end'>
					<div className='col-md-6 text-end'>
						<Link to={`/edit-submission-type/${id}`}>
							<button className='btn btn-primary'>Edit</button>
						</Link>
						<button
							className='btn btn-danger ms-3'
							onClick={() => onDelete(id)}>
							Delete
						</button>
					</div>
				</div>
			)}
			<Card
				title={`Submission Name: ${name}`}
				details={`Description : ${description}`}
				cta={
					isList
						? `${role === 'student' ? 'View Submission' : ''}`
						: ''
				}
				link={`/view-submission/${id}`}>
				<div className='card-text p-2 border border-1 my-2'>
					<p>
						Deadline:{' '}
						<Moment format='YYYY-MM-DD HH:mm'>{deadline}</Moment>
					</p>
					<p>File Types: {fileTypes}</p>
					<p>
						Marking Scheme:{' '}
						<a href={markingScheme}>
							<button className='btn btn-success'>
								Download
							</button>
						</a>
					</p>
				</div>
			</Card>
			{submission && <div className='m-3 p-3 border '>{submission}</div>}
		</div>
	);
};

export default SubmissionListItem;
