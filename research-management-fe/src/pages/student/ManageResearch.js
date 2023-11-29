import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';
import ResearchTopic from '../../components/research-topic/ResearchTopic';
import { AuthContext } from '../../store/auth';
import { getMyGroupResearch } from '../../utli/research.util';

const ManageResearch = () => {
	const { getUserInfo } = useContext(AuthContext);
	const [researchTopics, setResearchTopics] = useState([]);
	const [loading, setLoading] = useState(false);

	const getRTs = async () => {
		setLoading(true);
		const response = await getMyGroupResearch(getUserInfo().studentGroup);
		if (response.status) {
			setResearchTopics(response.research);
		} else {
			toast.error('Error loading research topics');
		}
		setLoading(false);
	};

	useEffect(() => {
		getRTs();
	}, []);

	if (loading) {
		return <Loading />;
	}
	return (
		<div>
			<div className='row'>
				<div className='col-md-12'>
					<h1>Manage Research topics</h1>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-12'>
					{researchTopics.length > 0 ? (
						researchTopics.map((rt) => {
							return (
								<ResearchTopic
									key={rt._id}
									id={rt._id}
									{...rt}
								/>
							);
						})
					) : (
						<div>No research topics found</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ManageResearch;
