import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGroupById } from '../../utli/student-group.util';
import Card from '../card/Card';

const StudentGroupComponent = ({ id }) => {
	const [studentGroup, setStudentGroup] = useState(null);
	const [loading, setLoading] = useState(true);

	const loadGroup = async () => {
		setLoading(true);
		const response = await getGroupById(id);
		if (response.status) {
			setStudentGroup(response.group);
		}
		setLoading(false);
	};

	useEffect(() => {
		loadGroup();
	}, []);

	return (
		<div className='bg-dark text-light p-2 rounded'>
			<h3>Group Details - {studentGroup && studentGroup.sg_id}</h3>
			{loading ? (
				<div className='text-center'>
					<div className='spinner-border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			) : studentGroup ? (
				<div>
					{studentGroup.researchTopics.length > 0 ? (
						<Card title='Research Topics'>
							<ul className='list-group list-group-numbered bg-dark text-light border border-light'>
								{studentGroup.researchTopics.map(
									(topic, index) => (
										<li
											className='list-group-item d-flex justify-content-between align-items-start bg-dark text-light'
											key={index}>
											<div className='ms-2 me-auto'>
												<div className='fw-bold'>
													{topic.topic}
												</div>
												{topic.category
													? topic.category.name
													: 'N/A'}
											</div>
											{topic.isApproved ? (
												<span className='badge bg-success rounded-pill'>
													approved
												</span>
											) : (
												<span className='badge bg-danger rounded-pill'>
													not approved
												</span>
											)}
										</li>
									)
								)}
							</ul>
						</Card>
					) : (
						<div className='text-start border border-light m-3 p-2 rounded'>
							<h4>No Research topics yet</h4>
							<div className='row justify-content-end'>
								<div className='col-md-3 justify-content-end'>
									<Link to='/add-research'>
										<button className='btn btn-primary '>
											Add Research
										</button>
									</Link>
								</div>
							</div>
						</div>
					)}
					<Card title='Students'>
						<ul className='list-group list-group-numbered bg-dark text-light border border-light'>
							{studentGroup.students.map((student, index) => (
								<li
									className='list-group-item d-flex justify-content-between align-items-start bg-dark text-light'
									key={index}>
									<div className='ms-2 me-auto'>
										<div className='fw-bold'>
											{student.name}
										</div>
										{student.email}
									</div>
								</li>
							))}
						</ul>
					</Card>
				</div>
			) : (
				<div className='text-center'>
					<h4>No Group Found</h4>
				</div>
			)}
		</div>
	);
};

export default StudentGroupComponent;
