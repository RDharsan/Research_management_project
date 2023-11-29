import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import Loading from '../../components/loading/Loading';
import Panel from '../../components/panel/Panel';
import { getStaff, loadPanels } from '../../utli/panel.util';

const ManagePanels = () => {
	const [panels, setPanels] = useState([]);
	const [loading, setLoading] = useState(false);
	const [staff, setStaff] = useState([]);

	const loadStaff = async () => {
		const response = await getStaff();
		if (response.status) {
			if (response.staff.length <= 0) {
				toast.error('No staff members found');
			}
			setStaff(response.staff);
		}
	};

	const getPanels = async () => {
		setLoading(true);
		const response = await loadPanels();
		if (response.status) {
			if (response.panels.length <= 0) {
				toast.error('No panels found');
			}
			setPanels(response.panels);
		}
		setLoading(false);
	};
	useEffect(() => {
		getPanels();
		loadStaff();
	}, []);

	const onStaffAdd = (id, staff) => {
		const newPanels = panels.map((panel) => {
			if (panel._id === id) {
				panel.staff.push(staff);
			}
			return panel;
		});
		setPanels(newPanels);
	};
	return (
		<div className='row'>
			<div className='col-md-12'>
				<h1>Manage Panels</h1>
			</div>
			<div className='col-md-12'>
				{loading ? (
					<Loading />
				) : panels.length > 0 ? (
					panels.map((panel) => {
						return (
							<Panel
								key={panel._id}
								panel={panel}
								onStaffAdd={onStaffAdd}
								staff={staff}
								category={panel.category}
							/>
						);
					})
				) : (
					<div>No panels found</div>
				)}
			</div>
		</div>
	);
};

export default ManagePanels;
