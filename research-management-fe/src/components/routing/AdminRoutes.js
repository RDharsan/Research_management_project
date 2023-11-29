import React from 'react';
import ViewUsers from '../../pages/admin/ViewUsers';
import UpdateUser from '../../pages/admin/UpdateUser';
import { Route } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import ViewStudentGroups from '../../pages/shared/ViewStudentGroups';
import CreateSubmissionType from '../../pages/admin/CreateSubmissionType';
import ViewSubmissionTypes from '../../pages/shared/ViewSubmissionTypes';
import EditSubmissionType from '../../pages/admin/EditSubmissionType';
import CreatePanel from '../../pages/admin/CreatePanel';
import ManagePanels from '../../pages/admin/ManagePanels';
import ManageStudentGroups from '../../pages/admin/ManageStudentGroups';
import ManageTemplates from '../../pages/admin/ManageTemplates';
import UpdateTemplate from '../update-template/UpdateTemplate';
import AddCategories from '../../pages/admin/AddCategories';

export const ADMIN_ROUTES = [
	{
		path: '/users',
		element: <ViewUsers />
	},
	{
		path: '/update-user/:id',
		element: <UpdateUser />
	},
	{
		path: '/show-student-groups',
		element: <ViewStudentGroups />
	},
	{
		path: '/create-submission',
		element: <CreateSubmissionType />
	},
	{
		path: '/view-submissions',
		element: <ViewSubmissionTypes />
	},
	{
		path: '/edit-submission-type/:id',
		element: <EditSubmissionType />
	},
	{
		path: '/create-panel',
		element: <CreatePanel />
	},
	{
		path: '/manage-panels',
		element: <ManagePanels />
	},
	{
		path: '/manage-student-groups',
		element: <ManageStudentGroups />
	},
	{
		path: '/manage-templates',
		element: <ManageTemplates />
	},
	{
		path: '/update-template/:id',
		element: <UpdateTemplate />
	},
	{
		path: '/add-categories',
		element: <AddCategories />
	}
];

export const getAdminRoutes = () => {
	return ADMIN_ROUTES.map((route, index) => {
		return (
			<Route
				key={index}
				exact
				path={route.path}
				element={
					<RequireAuth role='admin'>{route.element}</RequireAuth>
				}
			/>
		);
	});
};
