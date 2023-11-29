import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';
import Table from '../../components/table/Table';
import {
	approveSupervisorAndCoSupervisorRequests,
	getSupervisorAndCoSupervisorRequests
} from '../../utli/staff.util';

const ApproveTopics = () => {
	const [loading, setLoading] = useState(false);
	const [supervisorRequests, setSupervisorRequests] = useState([]);
	const [coSupervisorRequests, setCoSupervisorRequests] = useState([]);

	const getTopics = async () => {
		setLoading(true);
		const response = await getSupervisorAndCoSupervisorRequests();
		if (response.status) {
			if (response.supervisor_requests.length <= 0) {
				toast.error('No supervisor requests found');
			} else {
				setSupervisorRequests(response.supervisor_requests);
			}
			if (response.co_supervisor_requests.length <= 0) {
				toast.error('No co-supervisor requests found');
			} else {
				setCoSupervisorRequests(response.co_supervisor_requests);
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		getTopics();
	}, []);

	const approve = async (id, type) => {
		setLoading(true);
		const response = await approveSupervisorAndCoSupervisorRequests(id, {
			type
		});
		if (response.status) {
			toast.success('Request approved successfully');
			if (type === 'supervisor') {
				const newSupervisorRequests = supervisorRequests.filter(
					(request) => request._id !== id
				);
				setSupervisorRequests(newSupervisorRequests);
			} else {
				const newCoSupervisorRequests = coSupervisorRequests.filter(
					(request) => request._id !== id
				);
				setCoSupervisorRequests(newCoSupervisorRequests);
			}
		} else {
			toast.error('Error approving request');
		}

		setLoading(false);
	};

	return (
		<div className='row'>
			<div className='col-md-12'>
				<h1>Approve Topics</h1>
			</div>
			{loading ? (
				<Loading />
			) : (
				<div className='row'>
					<div className='col-md-12'>
						{supervisorRequests.length > 0 ? (
							<div className='mt-2'>
								<h2>Supervisor Requests</h2>
								<Table
									headers={['Topic', 'description', 'Action']}
									data={supervisorRequests}
									keys={['topic', 'description']}
									extraBtn={true}
									onExtraButtonClick={(
										id,
										type = 'supervisor'
									) => approve(id, type)}
									extraBtnTitle={'Approve'}
								/>
							</div>
						) : (
							<div className='mt-2 form-background'>
								<h2>No supervisor requests found</h2>
							</div>
						)}
						{coSupervisorRequests.length > 0 ? (
							<div className='mt-2'>
								<h2>Co-Supervisor Requests</h2>
								<Table
									headers={['Topic', 'description', 'Action']}
									data={coSupervisorRequests}
									keys={['topic', 'description']}
									extraBtn={true}
									onExtraButtonClick={(
										id,
										type = 'co-supervisor'
									) => approve(id, type)}
									extraBtnTitle={'Approve'}
								/>
							</div>
						) : (
							<div className='mt-2 form-background'>
								<h2>No Co-supervisor requests found</h2>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ApproveTopics;
