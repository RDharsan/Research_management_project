import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Loading, { Spinner } from '../../components/loading/Loading';
import { createPanel, getStaff } from '../../utli/panel.util';
import { getCategories } from '../../utli/research.util';
import Select from 'react-select';
import { Link } from 'react-router-dom';

const CreatePanel = () => {
	const [panel, setPanel] = useState({
		category: '',
		staff: []
	});
	const [categories, setCategories] = useState([]);
	const [categoryLoading, setCategoryLoading] = useState(true);
	const [staffMembers, setStaffMembers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [filteredStaff, setFilteredStaff] = useState([]);
	const [errors, setErrors] = useState({
		category: ''
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

	const loadStaff = async () => {
		const response = await getStaff();
		if (response.status) {
			if (response.staff.length <= 0) {
				toast.error('No staff members found');
			}
			setStaffMembers(response.staff);
		} else {
			toast.error('Error loading staff');
		}
	};
	useEffect(() => {
		loadCategories();
		loadStaff();
	}, []);

	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === 'category') {
			var filteredArray = staffMembers.filter((staff) =>
				staff.categories.some(
					(category) =>
						category._id === value && staff.panels.length <= 4
				)
			);

			setFilteredStaff(filteredArray);
		}
		setPanel({ ...panel, [name]: value, staff: [] });
	};

	const getStaffValues = () => {
		return filteredStaff.map((staff) => {
			return {
				value: staff._id,
				label: staff.name
			};
		});
	};

	const onStaffSelect = (selected) => {
		setPanel({ ...panel, staff: selected });
	};

	const getSelectedValues = () => {
		return panel.staff.map((staff) => {
			return staff.value;
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (!panel.category) {
			toast.error('Please select a category');
			return;
		}
		setLoading(true);
		const payload = {
			category: panel.category,
			staff: getSelectedValues()
		};
		const response = await createPanel(payload);
		if (response.status) {
			toast.success('Panel created successfully');
			setPanel({
				category: '',
				staff: []
			});
		} else {
			toast.error('Error creating panel');
		}
		setLoading(false);
	};

	return (
		<div className='row'>
			<div className='col-md-12'>
				<h1>Create Panel</h1>
			</div>
			{loading ? (
				<Loading />
			) : (
				<div className='col-md-12 form-background'>
					{categoryLoading ? (
						<Spinner />
					) : categories.length > 0 ? (
						<form onSubmit={onSubmit}>
							<div className='form-group'>
								<label htmlFor='category'>Category</label>
								<select
									className='form-control my-2'
									id='category'
									name='category'
									onChange={onChange}>
									<option value='' disabled selected>
										Select a category
									</option>
									{categories.map((category) => (
										<option
											key={category.id}
											value={category._id}>
											{category.name}
										</option>
									))}
								</select>
							</div>
							{panel.category && (
								<div className='form-group'>
									<label htmlFor='staff'>Staff</label>
									<Select
										id='staff'
										name='staff'
										options={getStaffValues()}
										onChange={onStaffSelect}
										isMulti
										isClearable
										isSearchable
										placeholder='Select staff'
										value={panel.staff}
									/>
								</div>
							)}
							<div className='row justify-content-end mt-2'>
								<div className='col-md-4 text-end'>
									<button className='btn btn-primary'>
										Create Panel
									</button>
								</div>
							</div>
						</form>
					) : (
						<div className='text-center'>
							<h3>No categories found</h3>
							<Link to='/categories'>
								<button className='btn btn-primary'>
									Create Category
								</button>
							</Link>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CreatePanel;
