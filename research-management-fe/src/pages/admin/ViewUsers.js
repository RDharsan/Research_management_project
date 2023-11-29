import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getToken } from '../../utli/auth.util';
import Table from '../../components/table/Table';
import Loading from '../../components/loading/Loading';

const ViewUsers = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const getUsers = async () => {
		setLoading(true);
		try {
			const res = await axios.get('api/auth/users', {
				headers: {
					authorization: `${getToken()}`
				}
			});
			// remove admin from list
			const newUsers = res.data.users.filter((u) => u.role !== 'admin');
			setUsers(newUsers);
		} catch (error) {
			if (error.response.status === 401) {
				toast.error('You are not authorized to view this page');
				navigate('/');
			}
		}
		setLoading(false);
	};
	useEffect(() => {
		getUsers();
		return () => {};
	}, []);
	if (loading) {
		return <Loading />;
	}
	const deleteUserRequest = async (id) => {
		setLoading(true);
		const response = await deleteUser(id);
		if (response.status) {
			toast.success('User deleted');
			const newUsers = users.filter((u) => u._id !== id);
			setUsers(newUsers);
		} else {
			toast.error('Error deleting user');
		}
		setLoading(false);
	};
	return (
		<>
			{users.length > 0 ? (
				<div>
					<div className='row'>
						<div className='col-md-12'>
							<h1>Manage Users</h1>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-12'>
							<Table
								headers={['id', 'Name', 'Email', 'Role']}
								data={users}
								keys={['_id', 'name', 'email', 'role']}
								onDelete={deleteUserRequest}
								updateLink='/update-user'
								id='_id'
							/>
						</div>
					</div>
				</div>
			) : (
				<div className='row'>
					<div className='col-md-12'>
						<h1>No Users</h1>
					</div>
				</div>
			)}
		</>
	);
};

export default ViewUsers;
