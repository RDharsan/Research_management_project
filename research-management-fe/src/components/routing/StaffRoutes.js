import React from 'react';

import { Route } from 'react-router-dom';
import ManageTemplates from '../../pages/admin/ManageTemplates';
import AddField from '../../pages/staff/AddField';
import ApproveTopics from '../../pages/staff/ApproveTopics';
import EvaluatedSubmissions from '../../pages/staff/EvaluatedSubmissions';
import EvaluateSubmissions from '../../pages/staff/EvaluateSubmissions';
import RequireAuth from './RequireAuth';

export const STAFF_ROUTES = [
	{
		path: '/approve-topics',
		element: <ApproveTopics />
	},
	{
		path: '/evaluate-submissions',
		element: <EvaluateSubmissions />
	},
	{
		path: '/add-field',
		element: <AddField />
	},
	{
		path: '/view-templates',
		element: <ManageTemplates />
	},
	{
		path: '/evaluated-submissions',
		element: <EvaluatedSubmissions />
	}
];

export const getStaffRoutes = () => {
	return STAFF_ROUTES.map((route, index) => {
		return (
			<Route
				key={index}
				exact
				path={route.path}
				element={
					<RequireAuth role='staff'>{route.element}</RequireAuth>
				}
			/>
		);
	});
};
