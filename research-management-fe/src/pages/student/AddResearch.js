import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import { Spinner } from '../../components/loading/Loading';
import { AuthContext } from '../../store/auth';
import { addResearch, getCategories } from '../../utli/research.util';

const AddResearch = () => {
	const navigate = useNavigate();
	const { getUserInfo } = useContext(AuthContext);
	const user = getUserInfo();
	const [loading, setLoading] = useState(false);
	const [research, setResearch] = useState({
		topic: '',
		description: '',
		category: '',
		studentGroup: user.studentGroup
	});
	const [categories, setCategories] = useState([]);
	const [categoryLoading, setCategoryLoading] = useState(true);
	const [errors, setErrors] = useState({
		topic: '',
		description: '',
		category: '',
		studentGroup: '',
		validation: ''
	});

	const loadCategories = async () => {
		setCategoryLoading(true);
		const response = await getCategories();
		if (response.status) {
			if (response.categories.length <= 0) {
				setErrors({ ...errors, category: 'No categories found' });
			}
			setCategories(response.categories);
		} else {
			toast.error('Error loading categories');
			setErrors({ ...errors, category: 'Error loading categories' });
		}
		setCategoryLoading(false);
	};

	useEffect(() => {
		loadCategories();
	}, []);

	const onChange = (e) => {
		const { name, value } = e.target;
		setErrors({
			topic: '',
			description: '',
			category: '',
			studentGroup: '',
			validation: ''
		});
		setResearch({ ...research, [name]: value });
	};

	const validate = () => {
		let isValid = true;
		// check if topic is atleast 30 characters
		if (research.topic.length < 30) {
			isValid = false;
			setErrors({
				...errors,
				topic: 'Topic must be atleast 30 characters'
			});
		} else if (research.description.length < 100) {
			isValid = false;
			setErrors({
				...errors,
				description: 'Description must be atleast 100 characters'
			});
		} else if (research.category === '') {
			isValid = false;
			setErrors({ ...errors, validation: 'Please select a category' });
		} else if (research.studentGroup === '') {
			isValid = false;
			setErrors({ ...errors, validation: 'Please select a group' });
		}

		return isValid;
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (validate()) {
			console.log(research);
			const response = await addResearch(research);
			if (response.status) {
				toast.success('Research added successfully');
				navigate('/student-group');
			} else {
				toast.error('Error adding research');
			}
		}
		setLoading(false);
	};
	return (
		<div className=''>
			<div className='row justify-content-center'>
				<div className='col-md-8'>
					<h1>Add Research</h1>
					{errors.category ? (
						<div className='alert alert-danger'>
							{errors.category}
						</div>
					) : (
						<form onSubmit={onSubmit}>
							<Input
								label='Topic'
								name='topic'
								value={research.topic}
								onChange={onChange}
								isError={!!errors.topic}
								errorMessage={errors.topic}
								type='text'
								placeHolder='Enter topic - min 30 characters'
							/>
							{/* text area input */}
							<div className={` my-2`}>
								<label
									htmlFor='Description'
									className='form-label'>
									Description
								</label>
								<textarea
									className='form-control'
									name='description'
									value={research.description}
									onChange={onChange}
									placeholder='Description (min 100 characters)'
									rows='5'></textarea>
								{errors.description && (
									<div className='alert alert-danger py-2 my-2'>
										{errors.description}
									</div>
								)}
							</div>
							{/* select input */}
							{categoryLoading ? (
								<Spinner />
							) : (
								categories.length > 0 && (
									<div className={` my-2`}>
										<label
											htmlFor='Category'
											className='form-label'>
											Category
										</label>
										<select
											className='form-control'
											name='category'
											value={research.category}
											onChange={onChange}>
											<option value='' selected disabled>
												Select category
											</option>
											{categories.map((category) => (
												<option
													key={category._id}
													value={category._id}>
													{category.name}
												</option>
											))}
										</select>
										{errors.category && (
											<div className='alert alert-danger py-2 my-2'>
												{errors.category}
											</div>
										)}
									</div>
								)
							)}

							{errors.validation && (
								<div className='alert alert-danger py-2 my-2'>
									{errors.validation}
								</div>
							)}
							{/* submit button */}
							<div className='row mt-4'>
								<div className='col-md-12'>
									{loading ? (
										<Spinner />
									) : (
										<button
											type='submit'
											className='btn btn-primary w-100'>
											Add Research
										</button>
									)}
								</div>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default AddResearch;
