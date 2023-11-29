import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserInfo, updateUser } from '../../utli/auth.util';
import Input from '../../components/input/Input';
import Loading from '../../components/loading/Loading';

const UpdateUser = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [user, setUser] = useState({
		name: '',
		email: ''
	});
	const [loading, setLoading] = useState(true);
	const [errors, setErrors] = useState({
		name: '',
		email: ''
	});

	useEffect(() => {
		loadUser();
	}, [id]);

	const loadUser = async () => {
		setLoading(true);
		const response = await getUserInfo(id);
		if (response.status) {
			setUser({
				name: response.user.name,
				email: response.user.email
			});
		} else {
			toast.error(response.error);
			navigate('/users');
		}
		setLoading(false);
	};

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const validate = () => {
		let isValid = true;
		const { name, email } = user;
		// check if email is valid using regex
		const emailRegex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!name) {
			setErrors({ ...errors, name: 'Name is required' });
			isValid = false;
		} else if (!emailRegex.test(email)) {
			setErrors({ ...errors, email: 'Invalid email' });
			isValid = false;
		}

		return isValid;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (validate()) {
			const response = await updateUser({ ...user, id });
			if (response.status) {
				toast.success('User updated successfully');
				navigate('/users');
			} else {
				toast.error(response.error);
			}
		}
		setLoading(false);
	};

	return (
		<div>
			<div className='row justify-content-center'>
				<div className='col-md-5 form-background'>
					<h1>Update user</h1>
					{loading ? (
						<Loading />
					) : (
						<form onSubmit={onSubmit} className='mt-3'>
							{Object.keys(user).map((key) => {
								if (key !== 'role') {
									return (
										<Input
											label={key.toUpperCase()}
											key={key}
											name={key}
											value={user[key]}
											onChange={onChange}
											isError={!!errors[key]}
											errorMessage={errors[key]}
											type={key}
											placeholder={`user's ${key}`}
										/>
									);
								}
							})}
							{/* <div className='form-group'>
								<label>Role</label>
								<select
									className='form-select'
									name='role'
									onChange={onChange}
									value={user.role}
									aria-label='Default select example'>
									<option value='admin'>Admin</option>
									<option value='student'>Student</option>
									<option value='staff'>Staff</option>
								</select>
							</div> */}
							<button className='btn btn-primary w-100 mt-3'>
								Update
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default UpdateUser;
