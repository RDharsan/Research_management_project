import React, { useState } from 'react';
import Input from '../input/Input';
import RequestSupervisor from '../request-supervisor/RequestSupervisor';
import UserList from '../user-list/UserList';

const ResearchTopic = ({
	id,
	topic,
	description,
	category,
	supervisorRequests,
	coSupervisorRequests,
	supervisor,
	coSupervisor,
	isApproved
}) => {
	const [supRequests, setSupRequest] = useState(supervisorRequests);
	const [coSupRequests, setCoSupRequest] = useState(coSupervisorRequests);

	const onChange = (type, staff_user) => {
		if (type === 'supervisor') {
			setSupRequest([...supRequests, staff_user]);
		} else {
			setCoSupRequest([...coSupRequests, staff_user]);
		}
	};
	return (
		<div className='row m-2'>
			<div className='card bg-dark text-light'>
				<div className='card-body'>
					<div className='row'>
						<div className='col-md-6'>
							<span className='badge bg-success rounded-pill mb-2'>
								Category : {category.name}
							</span>
						</div>
						<div className='col-md-6 text-end'>
							<span
								className={`badge bg-${
									isApproved ? 'success' : 'danger'
								} rounded-pill mb-2`}>
								{isApproved ? 'Approved' : 'Not Approved'}
							</span>
						</div>
					</div>
					<h4 className='card-title'>{topic}</h4>
					<p className='card-text'>{description}</p>
					<div className='card-text'>
						<h5>Supervisor Requests</h5>
						<div className='row justify-content-around'>
							{!supervisor ? (
								supRequests.length > 0 ? (
									<div className='col-md-5'>
										<UserList
											title='Supervisor'
											users={supRequests}
											badge={'not approved yet'}
										/>
										{supRequests.length < 2 && (
											<RequestSupervisor
												id={id}
												onComplete={onChange}
											/>
										)}
									</div>
								) : (
									<div className='col-md-5'>
										<RequestSupervisor
											id={id}
											onComplete={onChange}
										/>
									</div>
								)
							) : (
								<div className='col-md-5'>
									<UserList
										title='Supervisor'
										users={[supervisor]}
										badge={'approved'}
									/>
								</div>
							)}
							{!coSupervisor ? (
								coSupRequests.length > 0 ? (
									<div className='col-md-5'>
										<UserList
											title='Co-Supervisor'
											users={coSupRequests}
											badge='not approved yet'
										/>
										{coSupRequests.length < 2 && (
											<RequestSupervisor
												id={id}
												type='co-supervisor'
												onComplete={onChange}
											/>
										)}
									</div>
								) : (
									<div className='col-md-5'>
										<RequestSupervisor
											id={id}
											type='co-supervisor'
											onComplete={onChange}
										/>
									</div>
								)
							) : (
								<div className='col-md-5'>
									<UserList
										title='Co-Supervisor'
										users={[coSupervisor]}
										badge={'approved'}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResearchTopic;
