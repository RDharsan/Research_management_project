import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import { Spinner } from '../../components/loading/Loading';
import { createCategory } from '../../utli/staff.util';

const AddCategories = () => {
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();

		if (!name) {
			setError('Name is required');
			return;
		}
		setLoading(true);
		const response = await createCategory({ name });
		if (response.status) {
			setName('');
			setError('');
			toast.success('Category created successfully');
		} else {
			setError(response.error);
			toast.error(response.error);
		}
		setLoading(false);
	};

	const onChange = (e) => {
		setName(e.target.value);
		setError('');
	};

	return (
		<div className='row'>
			<div className='col-md-12'>
				<h1>Add Categories</h1>
			</div>
			<div className='row justify-content-center'>
				<div className='col-md-6 form-background'>
					<form onSubmit={onSubmit}>
						<Input
							label={'Expertise category name'}
							tpye='text'
							name='name'
							value={name}
							isError={!!error}
							errorMessage={error}
							onChange={onChange}
							placeholder='Name'
						/>
						<div className='row'>
							<div className='col-md-12'>
								<button
									type='submit'
									className='btn btn-primary w-100'>
									{loading ? <Spinner /> : 'Create'}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddCategories;
