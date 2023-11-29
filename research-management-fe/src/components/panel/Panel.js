import React, { useState } from 'react';
import Card from '../card/Card';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { addStaffMemberToPanel } from '../../utli/panel.util';
import { Spinner } from '../loading/Loading';

const Panel = ({ panel, staff, onStaffAdd, category }) => {
	const [showAddStaff, setShowAddStaff] = useState(false);
	const [selectedStaff, setSelectedStaff] = useState([]);
	const [loading, setLoading] = useState(false);

	const onChange = (selected) => {
		if (panel.staff.length + selected.length <= 5) {
			setSelectedStaff(selected);
		} else {
			toast.error('Panel can only have 5 staff members');
		}
	};

	const getStaffValues = () => {
		const panel_Staff = panel.staff.map((staff) => {
			return staff._id;
		});
		var filteredArray = staff.filter((st) =>
			st.categories.some(
				(ctg) => ctg._id === category._id && st.panels.length <= 4
			)
		);

		let newA = filteredArray.filter(
			(staff) => !panel_Staff.includes(staff._id)
		);
		return newA.map((staff) => {
			return {
				value: staff._id,
				label: staff.name
			};
		});
	};

	const getFullStaffObject = (id) => {
		return staff.find((staff) => staff._id === id);
	};
	const addStaffToPanel = async () => {
		selectedStaff.map(async (staff) => {
			const response = await addStaffMemberToPanel(
				panel._id,
				staff.value
			);
			if (response.status) {
				toast.success(`${staff.label} added to panel successfully`);
				const temp_staff = getFullStaffObject(staff.value);

				onStaffAdd(panel._id, temp_staff);
			} else {
				toast.error(`Error adding ${staff.label} to panel`);
			}
			setSelectedStaff([]);
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (selectedStaff.length === 0) {
			toast.error('Please select at least one staff member');
		} else {
			await addStaffToPanel();
		}
		setLoading(false);
	};
	return (
		<div className='my-2'>
			<Card
				key={panel._id}
				title={`Panel ID: ${panel._id.slice(18, 24)}`}
				details={`Category: ${panel.category.name}`}>
				<div key={panel._id} className='border p-2'>
					<h4>Panel Members</h4>
					{panel.staff.map((staff) => {
						return (
							<div key={staff._id}>
								<div className='row '>
									<div className='col-md-4 '>
										<p>
											Name : {staff.name} <br />
											Email : {staff.email}
										</p>
									</div>
								</div>
							</div>
						);
					})}
					{panel.staff.length < 5 && (
						<div>
							<form onSubmit={onSubmit}>
								<div className='form-group m-2'>
									<label htmlFor='staff'>
										Add more Staff{' '}
									</label>
									<Select
										className='text-dark'
										id='staff'
										name='staff'
										options={getStaffValues()}
										onChange={onChange}
										isMulti={true}
										value={selectedStaff}
									/>
								</div>
								<div className='row justify-content-end'>
									<div className='col-md-4 text-end'>
										<button
											className='btn btn-primary m-2'
											onClick={() =>
												setShowAddStaff(!showAddStaff)
											}>
											{loading ? (
												<Spinner />
											) : (
												'Add Staff'
											)}
										</button>
									</div>
								</div>
							</form>
						</div>
					)}
				</div>
			</Card>
		</div>
	);
};

export default Panel;
