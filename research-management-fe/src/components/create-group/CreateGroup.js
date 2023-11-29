import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../store/auth';
import { createGroup } from '../../utli/student-group.util';
import Input from '../input/Input';
import Loading from '../loading/Loading';

const CreateGroup = ({ onGroupCreated }) => {
	const { getUserInfo, setUserInfo } = useContext(AuthContext);
	const [groupName, setGroupName] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const userInfo = getUserInfo();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!groupName) {
			setError('Group name is required');
			return;
		}
		setLoading(true);
		const response = await createGroup({ name: groupName });
		if (response.status) {
			setGroupName('');
			setError('');
			toast.success('Group created successfully');
			onGroupCreated({ ...response.group, students: ['user'] });
			setUserInfo({ ...userInfo, studentGroup: response.group._id });
		} else {
			setError(response.error);
		}
		setLoading(false);
	};

	return (
		<>
			<div className='row mt-5 justify-content-around'>
				<div className='col-md-6 create-group'>
					<h2>Create a group</h2>
					<form onSubmit={handleSubmit}>
						<Input
							label='Group Name'
							name='groupName'
							value={groupName}
							onChange={(e) => setGroupName(e.target.value)}
							placeHolder='Enter group name'
							isError={!!error}
							errorMessage={error}
							type='text'
						/>
						{loading ? (
							<Loading />
						) : (
							<button className='btn btn-success w-100'>
								Create
							</button>
						)}
					</form>
				</div>
				<div className='col-md-1 text-center d-flex justify-content-center align-items-center'>
					<b>or</b>
				</div>
				<div className='col-md-5 create-group'>
					<h2>Join a group</h2>
					<p>
						you can browse through the list of groups and join to a
						group.
					</p>
					<Link to='/view-student-groups'>
						<button className='btn btn-warning w-100 mt-3'>
							Browe and Join
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default CreateGroup;
