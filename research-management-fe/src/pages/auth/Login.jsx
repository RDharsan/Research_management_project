import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../store/auth';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner } from '../../components/loading/Loading';

const Login = () => {
	const navigate = useNavigate();
	const { isAuthenticated, setAuthInfo } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (isAuthenticated()) {
			navigate('/');
		}
	}, []);

	const [userDetails, setUserDetails] = useState({
		email: '',
		password: ''
	});

	const [errors, setErrors] = useState({
		email: '',
		password: ''
	});

	const clearErrors = () => {
		toast.dismiss();
		setErrors({
			email: '',
			password: ''
		});
	};
	const onChange = (e) => {
		clearErrors();
		setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
	};

	const validate = () => {
		let isValid = true;
		const { email, password } = userDetails;
		// check if email is valid using regex
		const emailRegex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!emailRegex.test(email)) {
			setErrors({ ...errors, email: 'Invalid email' });
			isValid = false;
		} else if (password.length < 6) {
			setErrors({
				...errors,
				password: 'Password must be at least 6 characters'
			});
			isValid = false;
		}

		return isValid;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (validate()) {
				const response = await axios.post(
					'/api/auth/login',
					userDetails
				);
				if (response.status === 200) {
					toast.success('Login successful', {
						autoClose: 2000
					});
					const authData = {
						token: response.data.token,
						userInfo: response.data.user,
						expiresAt: response.data.expiresAt
					};
					setAuthInfo(authData);
				}
			}
		} catch (error) {
			toast.error(error.response.data.message, {
				autoClose: 10000,
				hideProgressBar: true
			});
		}
		setLoading(false);
	};

	return (
		<div>
			<div className='row justify-content-center'>
				<div className='col-md-6'>
					<h1>Login</h1>
				</div>
			</div>
			<div className='row justify-content-center'>
				<div className='col-md-6 form-background'>
					<form onSubmit={onSubmit}>
						{Object.keys(userDetails).map((key) => {
							return (
								<Input
									label={key.toUpperCase()}
									key={key}
									name={key}
									value={userDetails[key]}
									onChange={onChange}
									isError={!!errors[key]}
									errorMessage={errors[key]}
									type={key}
								/>
							);
						})}
						<button className='btn btn-primary w-100 mt-3'>
							{loading ? <Spinner /> : 'Login'}
						</button>
						<p className='or'>
							<span className='form-background'>or</span>
						</p>
						<Link to='/register' className='text-decoration-none'>
							<div className='row justify-content-center '>
								create new account
							</div>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
