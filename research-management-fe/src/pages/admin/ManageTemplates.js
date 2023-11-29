import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import CreateTemplate from '../../components/create-template/CreateTemplate';
import { Spinner } from '../../components/loading/Loading';
import Table from '../../components/table/Table';
import { AuthContext } from '../../store/auth';
import { deleteTemplate, getAllTemplates } from '../../utli/template.util';

const ManageTemplates = () => {
	const { getRole } = useContext(AuthContext);
	const role = getRole();
	const [templates, setTemplates] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showCreate, setShowCreate] = useState(false);

	const load = async () => {
		setLoading(true);
		const response = await getAllTemplates();
		if (response.status) {
			setTemplates(response.templates);
		} else {
			toast.error(response.message);
		}
		setLoading(false);
	};
	useEffect(() => {
		load();
	}, []);

	const onCreate = (template) => {
		setTemplates([...templates, template]);
		setShowCreate(false);
	};

	const download = (id) => {
		const template = templates.find((template) => template._id === id);
		const link = document.createElement('a');
		link.href = template.file;
		link.target = '_blank';
		link.download = template.name;
		link.click();
	};

	const deleteTemplateRequest = async (id) => {
		setLoading(true);
		const response = await deleteTemplate(id);
		if (response.status) {
			toast.success('Template deleted successfully');
			setTemplates(templates.filter((template) => template._id !== id));
		} else {
			toast.error(response.message);
		}
		setLoading(false);
	};
	return (
		<div className='row'>
			<div className='col-md-12'>
				<h1>{role === 'admin' ? 'Manage' : 'View'} Templates</h1>
			</div>
			{role === 'admin' && (
				<div className='row m-2'>
					<div className='col-md-12 text-end'>
						<button
							className='btn btn-primary'
							onClick={() => {
								setShowCreate(!showCreate);
							}}>
							{showCreate ? 'Hide create' : 'Create'} Template
						</button>
					</div>
				</div>
			)}
			{showCreate && <CreateTemplate onCreate={onCreate} />}

			<div className='row m-2'>
				<div className='col-md-12'>
					<h2>Templates</h2>
				</div>
				{loading ? (
					<Spinner />
				) : templates.length > 0 ? (
					<Table
						data={templates}
						headers={['Name', 'Description', 'Template']}
						keys={['name', 'description']}
						extraBtn={true}
						extraBtnTitle='Download'
						onExtraButtonClick={download}
						onDelete={
							role === 'admin' ? deleteTemplateRequest : null
						}
						id={'_id'}
						updateLink={
							role === 'admin' ? '/update-template' : null
						}
					/>
				) : (
					<div className='col-md-12'>
						<h3>No templates found</h3>
					</div>
				)}
			</div>
		</div>
	);
};

export default ManageTemplates;
