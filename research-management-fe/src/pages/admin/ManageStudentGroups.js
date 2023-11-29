import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import Loading from '../../components/loading/Loading';
import Table from '../../components/table/Table';
import { AuthContext } from '../../store/auth';
import {
	addStudentToGroup,
	assignPanelToGroup,
	getAllGroups
} from '../../utli/student-group.util';
import Select from 'react-select';
import { loadPanels } from '../../utli/panel.util';

const ManageStudentGroups = ({}) => {
	const { getRole, getUserInfo } = useContext(AuthContext);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [groups, setGroups] = useState([]);
	const [filteredGroups, setFilteredGroups] = useState([]);
	const role = getRole();
	const userInfo = getUserInfo();
	const [panels, setPanels] = useState([]);
	const [selectedPanel, setSelectedPanel] = useState([]);

	const loadGroups = async () => {
		setLoading(true);
		const response = await getAllGroups();
		if (response.status) {
			setGroups(response.groups);
			const groups_without_panel = response.groups.filter(
				(group) => !group.panel
			);

			setFilteredGroups(groups_without_panel);
		}
		setLoading(false);
	};

	const getPanels = async () => {
		setLoading(true);
		const response = await loadPanels();
		if (response.status) {
			setPanels(response.panels);
		}
		setLoading(false);
	};

	useEffect(() => {
		loadGroups();
		getPanels();
	}, []);

	const getPanelValues = () => {
		const panel_values = panels.map((panel) => {
			return {
				value: panel._id,
				label: `${panel._id.slice(18, 24)} - ${panel.category.name}`
			};
		});
		return panel_values;
	};

	const onChange = (e, id) => {
		//check if id is in selectedPanel
		const index = selectedPanel.findIndex((panel) => panel.group === id);
		if (index === -1) {
			setSelectedPanel([...selectedPanel, { group: id, panel: e.value }]);
		} else {
			const new_selected_panel = [...selectedPanel];
			new_selected_panel[index].panel = e.value;
			setSelectedPanel(new_selected_panel);
		}
	};
	const onSubmit = async (e, id) => {
		e.preventDefault();
		// get selected panel
		const selected_panel = selectedPanel.find(
			(panel) => panel.group === id
		);
		if (!selected_panel) {
			toast.error('Please select a panel');
			return;
		}
		setLoading(true);
		const payload = {
			panel_id: selected_panel.panel,
			group_id: id
		};
		const response = await assignPanelToGroup(payload);
		if (response.status) {
			toast.success('Panel assigned successfully');
			// remove the group from filtered groups
			const new_filtered_groups = [...filteredGroups];
			const index = new_filtered_groups.findIndex(
				(group) => group._id === id
			);
			new_filtered_groups.splice(index, 1);
			setFilteredGroups(new_filtered_groups);
		} else {
			toast.error('Error assigning panel');
		}
		setLoading(false);
	};
	return (
		<div className='row justify-content-center'>
			<h1>Manage Student Groups</h1>
			{!loading ? (
				filteredGroups.length > 0 ? (
					<div>
						<h4>Select a panel to assign to a group</h4>
						<Table
							headers={['id', 'Name', 'Assing a panel']}
							data={filteredGroups}
							keys={['sg_id', 'name']}
							id={'_id'}
							extraComponent={(id) => (
								<>
									{panels.length > 0 && (
										<div>
											<form
												onSubmit={(e) =>
													onSubmit(e, id)
												}>
												<Select
													options={getPanelValues()}
													onChange={(e) =>
														onChange(e, id)
													}
												/>
												<button
													className='btn btn-primary'
													type='submit'>
													Assign
												</button>
											</form>
										</div>
									)}
								</>
							)}
						/>
					</div>
				) : (
					<div>
						<h4>No groups without panel</h4>
					</div>
				)
			) : (
				<Loading />
			)}
		</div>
	);
};

export default ManageStudentGroups;
