import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';
import { getCategories } from '../../utli/research.util';
import { addCategoryToStaff } from '../../utli/staff.util';

const AddField = () => {
	const [categories, setCategories] = useState([]);
	const [field, setField] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const loadCategories = async () => {
		setIsLoading(true);
		const response = await getCategories();
		if (response.status) {
			setCategories(response.categories);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		loadCategories();
	}, []);

	const onChange = (e) => {
		const { name, value } = e.target;
		setField(value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (!field) {
			toast.error('Field is required');
		}
		setIsLoading(true);
		const response = await addCategoryToStaff({ category_id: field });
		if (response.status) {
			toast.success('Category added successfully');
		} else {
			toast.error(response.error);
		}
		setIsLoading(false);
	};

	return (
		<div className='row'>
			<div className='col-md-12'>
				<h1>Add Expertise Field</h1>
			</div>
			{isLoading ? (
				<Loading />
			) : (
				<div>
					{categories.length > 0 ? (
						<div className='col-md-12 form-background'>
							<form onSubmit={onSubmit}>
								<div className='form-group'>
									<label htmlFor='category'>Field</label>
									<select
										className='form-control'
										id='category'
										onChange={onChange}>
										<option value='' selected disabled>
											Select a field
										</option>
										{categories.map((category) => {
											return (
												<option
													key={category._id}
													value={category._id}>
													{category.name}
												</option>
											);
										})}
									</select>

									<div className='row justify-content-end'>
										<button
											type='submit'
											className='btn btn-primary m-2 w-25'>
											Add
										</button>
									</div>
								</div>
							</form>
						</div>
					) : (
						<div className='col-md-12'>
							<div>No categories found</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default AddField;
