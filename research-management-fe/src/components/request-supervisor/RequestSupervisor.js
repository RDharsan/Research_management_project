import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { requestSupervisor } from '../../utli/research.util';
import Input from '../input/Input';
import { Spinner } from '../loading/Loading';

const RequestSupervisor = ({ id, type = 'supervisor', onComplete }) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		email: '',
		message: '',
		type: type
	});
	const requestS = async () => {
		setLoading(true);
		const response = await requestSupervisor(id, data);
		if (response.status) {
			toast.success('Request sent successfully');
			setData({ ...data, email: '', message: '' });
			onComplete(type, response.user);
		} else {
			setData({ ...data, email: '', message: '' });
			toast.error(response.message);
		}
		setLoading(false);
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		if (!data.email) {
			toast.error('Please enter an email');
		} else if (!data.message) {
			toast.error('Please enter a message');
		} else {
			requestS();
		}
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	return (
		<div className='border border-white rounded p-4'>
			<div className='card-text'>
				<h5>Request {type}</h5>
				<form onSubmit={onSubmit}>
					<Input
						type='text'
						name='message'
						placeholder='Please consider this request'
						onChange={onChange}
						value={data.message}
						label={'Message'}
					/>
					<Input
						onChange={onChange}
						value={data.email}
						label={`${type} Email`}
						type='email'
						name='email'
						placeholder='email'
					/>
					<button
						className='btn btn-primary w-100 mt-2'
						type='submit'>
						{loading ? <Spinner /> : <> Request {type} </>}
					</button>
				</form>
			</div>
		</div>
	);
};

export default RequestSupervisor;
