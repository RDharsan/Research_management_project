import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';
import Table from '../../components/table/Table';
import { AuthContext } from '../../store/auth';
import {
	addStudentToGroup,
	getJoinableGroups
} from '../../utli/student-group.util';

const ViewStudentGroups = ({}) => {
	const { getRole, getUserInfo, setUserInfo } = useContext(AuthContext);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [groups, setGroups] = useState([]);
	const [filteredGroups, setFilteredGroups] = useState([]);
	const role = getRole();
	const userInfo = getUserInfo();

	const loadGroups = async () => {
		setLoading(true);
		const response = await getJoinableGroups();
		if (response.status) {
			setGroups(response.groups);
			setFilteredGroups(response.groups);
		} else {
			toast.error('Error loading groups');
			navigate(-1);
		}
		setLoading(false);
	};
	useEffect(() => {
		loadGroups();
	}, []);

	const onJoinGroupClick = async (group) => {
		setLoading(true);
		const response = await addStudentToGroup(userInfo._id, group);
		if (response.status) {
			toast.success('Student added to group');
			setUserInfo({
				...userInfo,
				studentGroup: response.studentGroup._id
			});
			navigate('/student-group');
		} else {
			toast.error('Error adding student to group');
		}
		setLoading(false);
	};
	return (
		<div className='row justify-content-center'>
			<h1 className='text-center'>Student Groups</h1>
			{!loading ? (
				filteredGroups.length > 0 ? (
					<Table
						headers={[
							'id',
							'Name',
							`${
								role === 'student'
									? !userInfo.studentGroup
										? 'Join to group'
										: ''
									: ''
							}`
						]}
						data={filteredGroups}
						keys={['sg_id', 'name']}
						extraBtn={
							!userInfo.studentGroup && role === 'student' && true
						}
						extraBtnTitle={
							!userInfo.studentGroup &&
							role === 'student' &&
							'Join'
						}
						id={'_id'}
						onExtraButtonClick={
							!userInfo.studentGroup && onJoinGroupClick
						}
					/>
				) : (
					<div className='text-center'>
						<h3>No groups to join</h3>
					</div>
				)
			) : (
				<Loading />
			)}
		</div>
	);
};

export default ViewStudentGroups;
